const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const logfilePath = path.join('/app/shared','timestamp.txt');

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));


async function fetchPongCount() {
  try {
    const response = await axios.get('http://ping-pong-app-service:82/pingpong'); // Ping-Pong app endpoint
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching ping-pong count:', error);
    return 'Error fetching pong count';
  }
}


//Routes
app.get('/api/status', async (req, res) => {
  try {
    const pongCount = await fetchPongCount(); // Fetch the ping-pong count from Ping-Pong app
    const timestamp = fs.existsSync(logfilePath) ? fs.readFileSync(logfilePath, 'utf8') : 'No timestamp found';
    const hash = crypto.createHash('sha256').update(timestamp).digest('hex');
    const text = fs.existsSync("/app/config/information.txt") ? fs.readFileSync("/app/config/information.txt", 'utf8') : 'No information found';
    const message = process.env.MESSAGE
    res.send(`file content: ${text}<br>${message} <br>${timestamp}: ${hash}<br>Ping / Pongs: ${pongCount}`);
  } catch (error) {
    res.status(500).send('Error fetching status');
  }
});

app.get("/latest-image", (req, res) => {
  const imagePath = path.join(__dirname, "shared", "latest-image.jpg");
  res.sendFile(imagePath);
});

// Serve the latest image at `/`
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"public", "index.html"));
});


app.listen(PORT, () => {
  console.log(`Log reader running on http://localhost:${PORT}`);
});