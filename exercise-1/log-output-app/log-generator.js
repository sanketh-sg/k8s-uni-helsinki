const fs = require('fs');
const path = require('path');
const axios = require('axios');

const filePath = path.join('/app/shared', 'timestamp.txt');
const imageFilePath = path.join('/app/shared', 'latest-image.jpg');

function generateTimestamp() {
  const timestamp = new Date().toISOString();
  fs.writeFileSync(filePath, timestamp);
  console.log(`Timestamp written: ${timestamp}`);
}

// Generate a new timestamp every 5 seconds
setInterval(generateTimestamp, 5000);

async function fetchAndSaveImage() {
  try {
    const response = await axios({
      url: 'https://loremflickr.com/1280/720',
      method: 'GET',
      responseType: 'stream'
    });

    response.data.pipe(fs.createWriteStream(imageFilePath));
    console.log('Image fetched and saved.');
  } catch (error) {
    console.error('Error fetching the image:', error);
  }
}

fetchAndSaveImage();
