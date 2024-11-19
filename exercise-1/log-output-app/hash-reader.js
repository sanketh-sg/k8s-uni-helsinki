const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');

const filePath = path.join('/app/shared', 'timestamp.txt');
const app = express();
const PORT = process.env.PORT || 3000;

function readTimestamp() {
  if (fs.existsSync(filePath)) {
    const timestamp = fs.readFileSync(filePath, 'utf8');
    const hash = crypto.createHash('sha256').update(timestamp).digest('hex');
    return { timestamp, hash };
  } else {
    return { error: 'Timestamp file not found' };
  }
}

app.get('/api/status', (req, res) => {
  res.json(readTimestamp());
});

app.listen(PORT, () => {
  console.log(`Log reader running on http://localhost:${PORT}`);
});