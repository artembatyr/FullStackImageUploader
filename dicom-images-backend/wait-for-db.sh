#!/bin/sh

echo "Waiting for MySQL to start..."
while ! nc -z dicom-images-db 3306; do
  sleep 1
done

echo "MySQL started"
exec "$@"
