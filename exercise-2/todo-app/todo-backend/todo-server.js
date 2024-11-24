const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors({
    origin: '*',  // Allow all origins
    methods: ['GET', 'POST'],        // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Specify allowed headers
  }));
app.use(bodyParser.json());

let todos = []; // Store todos in memory

// Endpoint: Fetch all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Endpoint: Add a new todo
app.post("/todos", (req, res) => {
  const { task } = req.body;
  if (!task || task.length > 140) {
    return res.status(400).json({ error: "Task must be between 1 and 140 characters." });
  }
  const newTodo = { id: Date.now(), task };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Endpoint: Serve the latest image
app.get("/latest-image", async (req, res) => {
  try {
    const response = await axios({
      url: "https://loremflickr.com/1280/720",
      method: "GET",
      responseType: "stream",
    });
    res.setHeader("Content-Type", "image/jpeg");
    response.data.pipe(res);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).send("Error fetching image.");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
