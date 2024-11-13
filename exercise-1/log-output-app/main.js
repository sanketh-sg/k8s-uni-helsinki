import crypto from 'crypto';

// Generate a random string
const randomString = crypto.randomBytes(16).toString('hex');

// Function to output the random string with a timestamp
function outputRandomString() {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}]: ${randomString}`);
}

// Output the random string every 5 seconds
setInterval(outputRandomString, 5000);

// Initial output on startup
outputRandomString();