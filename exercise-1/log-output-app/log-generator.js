const fs = require('fs');
const path = require('path');

const filePath = path.join('/app/shared', 'timestamp.txt');

function generateTimestamp() {
  const timestamp = new Date().toISOString();
  fs.writeFileSync(filePath, timestamp);
  console.log(`Timestamp written: ${timestamp}`);
}

// Generate a new timestamp every 5 seconds
setInterval(generateTimestamp, 5000);