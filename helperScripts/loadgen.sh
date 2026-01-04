#!/bin/bash
#
# loadgen.sh - Simple load generator that continuously sends HTTP requests to the sample app to produce metrics visible in Prometheus and Grafana dashboards.
#
# Usage:
#   ./loadgen.sh http://myk8sapp-dev.ingress.com/
#
# Default target is https://myk8sapp-dev.ingress.com if no argument is provided.

TARGET_URL=${1:-https://myk8sapp-dev.ingress.com/}

echo "Starting load generation against $TARGET_URL ..."
echo "Press Ctrl+C to interrupt and stop."

while true; do
  curl -sk "$TARGET_URL" > /dev/null
  sleep 0.1
done