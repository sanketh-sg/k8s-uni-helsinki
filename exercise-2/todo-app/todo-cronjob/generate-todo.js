const { Client } = require("pg");
const axios = require("axios");

// Fetch a random Wikipedia article
const fetchRandomWikipediaArticle = async () => {
  try {
    const response = await axios.get("https://en.wikipedia.org/wiki/Special:Random", {
      maxRedirects: 0,
      validateStatus: (status) => status === 302, // Handle redirect
    });
    return response.headers.location; // Return redirected URL
  } catch (error) {
    console.error("Error fetching random Wikipedia article:", error);
    return null;
  }
};

// Insert a todo into the database
const insertTodo = async (client, task) => {
  const query = "INSERT INTO todos (task) VALUES ($1)";
  const deleteOld = "DELETE FROM todos";
  await client.query(deleteOld);
  await client.query(query, [task]);
};

// Main function
const main = async () => {
  const client = new Client({
    connectionString: "postgres://postgres:root@todo-postgres-service.todo-app.svc.cluster.local:5432/todo_app_db", // Set via environment variable
  });

  try {
    await client.connect();
    console.log("Connected to PostgreSQL");

    const url = await fetchRandomWikipediaArticle();
    if (!url) throw new Error("Failed to fetch random Wikipedia article");

    const task = `Read ${url}`;
    await insertTodo(client, task);

    console.log(`New todo added: ${task}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.end();
  }
};

main();
