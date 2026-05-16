'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const promClient = require('prom-client');
const morgan = require('morgan');

const app = express();
// Align with your manifest: containerPort 8080
const PORT = Number(process.env.PORT || 8080);
const METRICS_PATH = process.env.METRICS_PATH || '/metrics';
// Align persistence with hostPath /mnt
const DATA_FILE = process.env.DATA_FILE || '/mnt/storage.json';

// ---- Basic persistence on mounted volume ----
function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return { items: [] };
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Write failed:', err.message);
  }
}

try {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    writeData({ items: [] });
  }
} catch (e) {
  console.error('Init storage failed:', e.message);
}

// ---- Prometheus metrics ----
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});
register.registerMetric(httpRequestsTotal);

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5]
});
register.registerMetric(httpRequestDuration);

const itemsGauge = new promClient.Gauge({
  name: 'app_items_count',
  help: 'Current number of items stored'
});
register.registerMetric(itemsGauge);

// ---- Middleware ----
app.use(express.json());
app.use(morgan('combined'));
app.use((req, res, next) => {
  const route = req.path;
  const end = httpRequestDuration.startTimer({ method: req.method, route });
  res.on('finish', () => {
    const status = res.statusCode;
    httpRequestsTotal.inc({ method: req.method, route, status });
    end({ method: req.method, route, status });
  });
  next();
});

// ---- Health ----
app.get('/healthz', (req, res) => res.status(200).send('ok'));
app.get('/readyz', (req, res) => {
  try {
    readData();
    res.status(200).send('ready');
  } catch {
    res.status(500).send('not ready');
  }
});

// ---- Metrics ----
app.get(METRICS_PATH, async (req, res) => {
  try {
    const items = readData().items || [];
    itemsGauge.set(items.length);
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).send('metrics error');
  }
});

// ---- Minimal API ----
app.get('/', (req, res) => {
  res.status(200).send('myk8sapp frontend: use /items and /metrics');
});

app.get('/items', (req, res) => {
  const data = readData();
  res.status(200).json({ items: data.items });
});

app.post('/items', (req, res) => {
  const data = readData();
  const item = req.body?.item;
  if (!item) return res.status(400).json({ error: 'item field required' });
  data.items.push({ id: Date.now(), value: item });
  writeData(data);
  res.status(201).json({ ok: true });
});

app.delete('/items/:id', (req, res) => {
  const data = readData();
  const id = Number(req.params.id);
  const before = data.items.length;
  data.items = data.items.filter(i => i.id !== id);
  writeData(data);
  if (data.items.length === before) return res.status(404).json({ error: 'not found' });
  res.status(200).json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}, metrics at ${METRICS_PATH}, data at ${DATA_FILE}`);
});

