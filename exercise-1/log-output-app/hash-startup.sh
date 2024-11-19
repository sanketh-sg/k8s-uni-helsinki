#!/bin/sh

FILE=/app/shared/timestamp.txt

# Wait until the file exists
echo "Waiting for the file: $FILE"
while [ ! -f "$FILE" ]; do
  sleep 1
done

echo "$FILE detected. Starting hash reader application..."
