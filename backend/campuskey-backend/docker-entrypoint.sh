#!/bin/sh
set -eu

mkdir -p "$CAMPUSKEY_UPLOADS_DIRECTORY"
chown -R campuskey:campuskey "$CAMPUSKEY_UPLOADS_DIRECTORY"
exec su-exec campuskey java -XX:MaxRAMPercentage=75.0 -jar /app/app.jar
