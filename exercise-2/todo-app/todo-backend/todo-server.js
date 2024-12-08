const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { Client } = require("pg");

const app = express();

// Middleware
app.use(cors({ origin: "*", methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));
app.use(bodyParser.json());

let client; // Declare client globally

// Initialize the database
const initDB = async () => {
  client = new Client({
    connectionString: process.env.DATABASE_URL || "postgres://postgres:root@todo-postgres-service.todo-app.svc.cluster.local:5432/todo_app_db",
  });

  try {
    await client.connect();
    console.log("Connected to PostgreSQL");
    await ensureTableExists(); // Ensure the table is created
  } catch (err) {
    console.error("Database connection failed:", err.stack);
    process.exit(1); // Exit if DB connection fails
  }
};

// Ensure the table exists
const ensureTableExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      task VARCHAR(140) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await client.query(createTableQuery);
    console.log("Table `todos` is ready.");
  } catch (err) {
    console.error("Error creating table:", err.stack);
    process.exit(1);
  }
};

// Fetch all todos
app.get("/todos", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM todos ORDER BY id ASC");
    if (result.rows.length === 0) {
      // If the table is empty, return an empty array
      return res.json([]);
    }
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new todo
app.post("/todos", async (req, res) => {
  const { task } = req.body;
  if (!task || task.length > 140) {
    return res.status(400).json({ error: "Task must be between 1 and 140 characters." });
  }
  try {
    const insertQuery = "INSERT INTO todos (task) VALUES ($1) RETURNING *";
    const result = await client.query(insertQuery, [task]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding todo:", err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Serve the latest image
app.get("/latest-image", async (req, res) => {
  try {
    const response = await axios({
      url: "https://loremflickr.com/1280/720",
      method: "GET",
      responseType: "stream",
    });
    res.setHeader("Content-Type", "image/jpeg");
    response.data.pipe(res);
  } catch (err) {
    console.error("Error fetching image:", err.stack);
    res.status(500).send("Error fetching image.");
  }
});

// Health check
app.get("/ping", async (req, res) => {
  res.send("pong");
});


// Start the server
const PORT = process.env.PORT || 5000;
initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err.stack);
  });
