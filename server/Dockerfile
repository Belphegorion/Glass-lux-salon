# server/Dockerfile
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

# Copy the rest of the source
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "index.js"]
