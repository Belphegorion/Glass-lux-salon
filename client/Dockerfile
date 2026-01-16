# client/Dockerfile
FROM node:20-slim AS build
WORKDIR /app

# Copy package files
COPY package*.json .npmrc ./

# Clean install with proper optional dependencies
RUN rm -rf node_modules package-lock.json && \
    npm install --legacy-peer-deps --include=optional

# Copy source & build
COPY . .
RUN npm run build

# Serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
