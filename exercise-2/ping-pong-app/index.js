const express = require('express');
const { Client } = require('pg');
const app = express();

// Database connection string from environment variable
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:root@postgres-service.default.svc.cluster.local:5432/pingpong_app_db';

// Initialize PostgreSQL client
const client = new Client({
  connectionString: DATABASE_URL,
});

// Connect to the database
client.connect()
  .then(async () => {
    console.log('Connected to PostgreSQL');
    await ensureTableExists(); // Ensure the table is created
  })
  .catch(err => {
    console.error('Database connection failed:', err.stack);
    process.exit(1); // Exit the app if the database connection fails
  });


const ensureTableExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS pingpong (
      id SERIAL PRIMARY KEY,
      count INT NOT NULL
    );
    INSERT INTO pingpong (id, count)
    SELECT 1, 0
    WHERE NOT EXISTS (SELECT 1 FROM pingpong WHERE id = 1);
  `;
  try {
    await client.query(createTableQuery);
    console.log('Table `pingpong` is ready.');
  } catch (err) {
    console.error('Error creating table:', err);
    process.exit(1);
  }
};

// Ping-Pong API
app.get('/pingpong', async (req, res) => {
  try {
    // Fetch the current count from the database
    const selectQuery = 'SELECT count FROM pingpong WHERE id = 1';
    const result = await client.query(selectQuery);

    // Increment the count
    const updatedCount = (result.rows[0]?.count || 0) + 1;

    // Update the count in the table
    const updateQuery = 'UPDATE pingpong SET count = $1 WHERE id = 1 RETURNING count';
    const updateResult = await client.query(updateQuery, [updatedCount]);

    // Respond with the updated count
    res.send(`pong ${updateResult.rows[0].count}`);
  } catch (err) {
    console.error('Error accessing database:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/ping', async (req, res) => {
  res.send('pong');
});


// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Ping-Pong app running on http://localhost:${PORT}`);
});
