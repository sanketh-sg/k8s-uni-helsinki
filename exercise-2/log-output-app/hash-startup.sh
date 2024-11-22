#!/bin/sh

LOG_FILE=/app/shared/timestamp.txt
PING_FILE=/app/shared/pingpong-count.txt

# Wait until the file exists
echo "Waiting for the file: $LOG_FILE \& $PING_FILE"
while [ ! -f "$LOG_FILE" ] && [! -f "$PING_FILE"]; do
  sleep 1
done

echo "$LOG_FILE \& $PING_FILE detected. Starting hash reader application..."
