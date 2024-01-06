#!/usr/bin/env bash

echo "----------------------------------------"
echo "Starting application (${APPTYPE})..."
echo " as (UID:GID) $(id -u):$(id -g)"
echo " with pid $$"
echo " just a test"
echo "----------------------------------------"

nginx -g 'daemon on;'
cd /app
gunicorn --bind=0.0.0.0:5000 "${APPTYPE}:app"
