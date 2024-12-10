import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  // Fetch todos from backend
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/todos`)
      .then((response) => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setError("Failed to load todos. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Handle form submission
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      setError("Task cannot be empty.");
      return;
    }

    axios
      .post(`${API_BASE_URL}/todos`, { task: newTodo.trim() })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo("");
        setError("");
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
        setError("Failed to add the todo. Please try again.");
      });
  };

  return (
    <div className="App">
      <h1>Todo App with Image</h1>

      {/* Image Section */}
      <div className="image-section">
        <img
          src={`${API_BASE_URL}/latest-image`}
          alt="Random"
          onError={() => setImageError(true)}
          style={{
            maxWidth: "100%",
            height: "auto",
            border: "1px solid #ccc",
            display: imageError ? "none" : "block",
          }}
        />
        {imageError && <p>Failed to load the image. Please try again later.</p>}
      </div>

      {/* Todo Section */}
      <div className="todo-section">
        <h2>Todos</h2>
        {loading ? (
          <p>Loading todos...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : todos.length === 0 ? (
          <p>No todos available. Add your first todo!</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.task}</li>
            ))}
          </ul>
        )}

        {/* Form for Adding Todos */}
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            placeholder="Enter new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    </div>
  );
};

export default App;
