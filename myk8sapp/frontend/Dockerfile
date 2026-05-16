FROM node:20-alpine

WORKDIR /app

# Install only production deps
COPY package.json ./
RUN npm ci --only=production

# Copy app
COPY server.js ./

# Non-root user
RUN adduser -D appuser
USER appuser

# Environment aligned with deployment
ENV PORT=8080 \
    METRICS_PATH=/metrics \
    DATA_FILE=/mnt/storage.json

EXPOSE 8080
CMD ["node", "server.js"]

