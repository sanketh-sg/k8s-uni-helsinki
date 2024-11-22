const express = require('express');
const app = express();

let counter = 0; 

app.get('/pingpong', (req, res) => {
    counter += 1;
    res.send(`pong ${counter}`);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Ping-Pong app running on http://localhost:${PORT}`);
});
