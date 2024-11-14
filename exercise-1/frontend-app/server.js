// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const LOG_OUTPUT_APP_URL = 'http://log-output-app-service/api/hash'; // External API endpoint

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to handle GET request from the frontend
app.get('/api/hash', async (req, res) => {
  try {
    // Here, you can handle any internal logic or routing you want
    // If you need to fetch data from an external service, you can use `fetch` or `axios`
    
    const response = await fetch(LOG_OUTPUT_APP_URL);
    const data = await response.json();
    res.json(data); // Send the data as JSON back to the client
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from log-output-app' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Frontend viewer running on http://localhost:${PORT}`);
});
