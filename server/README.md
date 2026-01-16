# Salon Server

## Run locally
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and set `MONGO_URI` and `PORT`.
3. Run dev: `npm run dev` (nodemon must be installed)

## Docker
Build & run with docker-compose at repo root:
`docker compose up --build`

This will start mongo (27017), server (5000), and client (3000 served by nginx).
