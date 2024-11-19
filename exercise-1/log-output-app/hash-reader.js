const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');

const logfilePath = path.join('/app/shared','timestamp.txt');
const pingfilePath = path.join('/app/shared','pingpong-count.txt');
const app = express();
const PORT = process.env.PORT || 3000;

function readTimestamp() {

  if (fs.existsSync(logfilePath) && fs.existsSync(pingfilePath)) {
    const timestamp = fs.readFileSync(logfilePath, 'utf8');

    const count = fs.readFileSync(pingfilePath, 'utf8');

    const hash = crypto.createHash('sha256').update(timestamp).digest('hex');

    return { timestamp, hash, count };
  } else {
    return { error: 'Timestamp and Ping files not found' };
  }
}

app.get('/api/status', (req, res) => {
    let { timestamp, hash, count, error } = readTimestamp();
    
  if (error) {
    res.status(500).send(error);
    } else {
    res.send(`${timestamp}: ${hash}<br>Ping / Pongs: ${count}`);
    }
});

app.listen(PORT, () => {
  console.log(`Log reader running on http://localhost:${PORT}`);
});