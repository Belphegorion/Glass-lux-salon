#!/usr/bin/env bash
# run_full_setup.sh
# Comprehensive helper script to install dependencies, run tests, build client, and run the app.
# Usage:
#   ./run_full_setup.sh --local        # install & run locally (server + client dev)
#   ./run_full_setup.sh --build-only   # install deps and build client
#   ./run_full_setup.sh --test         # run server unit tests
#   ./run_full_setup.sh --docker       # run docker compose up --build (requires docker & docker-compose)
#   ./run_full_setup.sh --e2e          # run Playwright tests (requires Playwright installed)
# The script creates logs in ./logs/

set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_DIR="$ROOT_DIR/logs"
mkdir -p "$LOG_DIR"

function check_cmd() {
  command -v "$1" >/dev/null 2>&1 || { echo >&2 "Required command '$1' not found. Please install it and retry."; exit 1; }
}

function install_server_deps() {
  echo "Installing server dependencies..." | tee "$LOG_DIR/server_install.log"
  pushd "$ROOT_DIR/server" >/dev/null
  npm install 2>&1 | tee "$LOG_DIR/server_install.log"
  popd >/dev/null
}

function install_client_deps() {
  echo "Installing client dependencies..." | tee "$LOG_DIR/client_install.log"
  pushd "$ROOT_DIR/client" >/dev/null
  npm install 2>&1 | tee "$LOG_DIR/client_install.log"
  popd >/dev/null
}

function run_server_tests() {
  echo "Running server tests..." | tee "$LOG_DIR/server_test.log"
  pushd "$ROOT_DIR/server" >/dev/null
  npm test 2>&1 | tee "$LOG_DIR/server_test.log"
  popd >/dev/null
}

function build_client() {
  echo "Building client..." | tee "$LOG_DIR/client_build.log"
  pushd "$ROOT_DIR/client" >/dev/null
  npm run build 2>&1 | tee "$LOG_DIR/client_build.log"
  popd >/dev/null
}

function start_server() {
  echo "Starting server (production)..." | tee "$LOG_DIR/server_start.log"
  pushd "$ROOT_DIR/server" >/dev/null
  # Ensure .env exists
  if [ ! -f .env ]; then
    if [ -f .env.example ]; then
      cp .env.example .env
      echo "Copied .env.example to .env (edit .env to configure production secrets)"
    else
      echo "No .env or .env.example present - using environment defaults"
    fi
  fi
  # Start server in background using nohup
  nohup node index.js > "$LOG_DIR/server_stdout.log" 2> "$LOG_DIR/server_stderr.log" &
  SERVER_PID=$!
  echo "Server started with PID $SERVER_PID"
  popd >/dev/null
}

function start_client_dev() {
  echo "Starting client dev server (Vite) - opens on default port (usually 5173 or 3000)" | tee "$LOG_DIR/client_dev.log"
  pushd "$ROOT_DIR/client" >/dev/null
  npm run dev 2>&1 | tee "$LOG_DIR/client_dev.log"
  popd >/dev/null
}

function run_playwright() {
  echo "Running Playwright E2E tests..." | tee "$LOG_DIR/playwright.log"
  pushd "$ROOT_DIR/e2e" >/dev/null
  npx playwright test 2>&1 | tee "$LOG_DIR/playwright.log"
  popd >/dev/null
}

function docker_compose_up() {
  check_cmd docker
  check_cmd docker-compose || true
  echo "Running docker compose up --build..." | tee "$LOG_DIR/docker_compose.log"
  pushd "$ROOT_DIR" >/dev/null
  docker compose up --build 2>&1 | tee "$LOG_DIR/docker_compose.log"
  popd >/dev/null
}

if [ "${1:-}" == "--local" ]; then
  check_cmd node
  check_cmd npm
  install_server_deps
  install_client_deps
  echo "To run both dev servers, open two terminals and run:"
  echo "  (1) cd server && npm run dev"
  echo "  (2) cd client && npm run dev"
  exit 0
fi

if [ "${1:-}" == "--build-only" ]; then
  check_cmd node
  check_cmd npm
  install_server_deps
  install_client_deps
  build_client
  echo "Build complete. Dist folder is at client/dist"
  exit 0
fi

if [ "${1:-}" == "--test" ]; then
  check_cmd node
  check_cmd npm
  install_server_deps
  run_server_tests
  exit 0
fi

if [ "${1:-}" == "--e2e" ]; then
  check_cmd node
  check_cmd npm
  install_server_deps
  install_client_deps
  build_client
  start_server
  # wait for server to spin up a bit
  echo "Waiting 3s for server to initialize..."
  sleep 3
  run_playwright
  exit 0
fi

if [ "${1:-}" == "--docker" ]; then
  docker_compose_up
  exit 0
fi

echo "Usage: $0 [--local|--build-only|--test|--e2e|--docker]"
echo "  --local      Install deps for local dev (runs npm install)"
echo "  --build-only Install deps and build client (creates client/dist)"
echo "  --test       Install server deps and run server tests (Jest)"
echo "  --e2e        Build client, start server, and run Playwright tests (requires Playwright)"
echo "  --docker     Run docker compose up --build (requires Docker)"
exit 0
