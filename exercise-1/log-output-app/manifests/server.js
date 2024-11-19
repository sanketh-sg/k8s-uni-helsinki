const crypto = require('crypto');
const express = require('express');
const path = require('path');

// Generate a random string
const randomString = crypto.randomBytes(16).toString('hex');
const app = express();
const PORT = process.env.PORT || 3000;

// Function to output the random string with a timestamp
function outputRandomString() {
  const timestamp = new Date().toISOString();
  let log = `[${timestamp}]: ${randomString}`;
  console.log(log);
  return log;
}

// Output the random string every 5 seconds
setInterval(outputRandomString, 5000);

// // Initial output on startup
// let status = outputRandomString();

// API endpoint to handle GET request from the frontend
app.get('/api/hi', async (req, res) => {
 res.send("Hello")
});

app.get('/api/status', async (req, res) => {
  res.send(outputRandomString());
 });

// Start the server
app.listen(PORT, () => {
  console.log(`Frontend viewer running on http://localhost:${PORT}`);
});
