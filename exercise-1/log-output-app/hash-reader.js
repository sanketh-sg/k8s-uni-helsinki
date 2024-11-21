const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');

const logfilePath = path.join('/app/shared','timestamp.txt');
const pingfilePath = path.join('/app/shared','pingpong-count.txt');
const imageDir = path.dirname('/app/images')
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


//Routes
app.get('/api/status', (req, res) => {
    let { timestamp, hash, count, error } = readTimestamp();
    
  if (error) {
    res.status(500).send(error);
    } else {
    res.send(`${timestamp}: ${hash}<br>Ping / Pongs: ${count}`);
    }
});

app.get('/', (req, res) => {
    const image = fs.readdirSync(imageDir);
    const latestImage = image.sort().pop(); // Get the latest file based on timestamp
    if (latestImage) {
      res.sendFile(path.join(imageDir, latestImage));
    } else {
      res.status(404).send('No images found');
    }
  });

app.listen(PORT, () => {
  console.log(`Log reader running on http://localhost:${PORT}`);
});