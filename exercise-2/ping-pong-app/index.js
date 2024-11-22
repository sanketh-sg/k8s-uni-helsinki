const express = require('express');
// const fs = require('fs');
// const path = require('path');
const app = express();
// Shared path
// const filePath = path.join('/app/shared', 'pingpong-count.txt');

// Initialize the file with 0 if it doesn't exist
// if (!fs.existsSync(filePath)) {
//     fs.writeFileSync(filePath, '0', 'utf8');
//   }
  
// let counter = parseInt(fs.readFileSync(filePath, 'utf8'), 10); // Initialize counter from file
  
let counter = 0; 


app.get('/pingpong', (req, res) => {
    counter += 1;
    //fs.writeFileSync(filePath, counter.toString(), 'utf8');
    res.send(`pong ${counter}`);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Ping-Pong app running on http://ping-pong-app-service:${PORT}`);
});
