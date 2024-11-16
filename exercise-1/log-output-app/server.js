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
  console.log(`[${timestamp}]: ${randomString}`);
}

// Output the random string every 5 seconds
setInterval(outputRandomString, 5000);

// Initial output on startup
outputRandomString();

// API endpoint to handle GET request from the frontend
app.get('/api/hi', async (req, res) => {
 res.send("Hello")
});

// Start the server
app.listen(PORT, () => {
  console.log(`Frontend viewer running on http://localhost:${PORT}/api/hi`);
});
