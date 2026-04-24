#!/bin/bash
set -e
PROJECT_DIR="$(dirname "$0")"
cd "$PROJECT_DIR"
echo "Pulling latest code..."
git pull origin main
echo "Rebuilding Docker image..."
docker compose build
echo "Restarting containers..."
docker compose up -d
echo "Deploy complete!"
docker compose ps
