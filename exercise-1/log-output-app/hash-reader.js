const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');


const app = express();
const PORT = process.env.PORT || 3000;

const logfilePath = path.join('/app/shared','timestamp.txt');
const pingfilePath = path.join("/app/shared",'pingpong-count.txt');
// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Serve static files from the shared folder
app.use("/shared", express.static(path.join(__dirname, "shared")));



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