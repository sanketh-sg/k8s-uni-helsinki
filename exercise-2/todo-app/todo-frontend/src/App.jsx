import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos from backend
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/todos`)
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  // Handle form submission
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;

    axios
      .post(`${API_BASE_URL}/todos`, { task: newTodo })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo("");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  return (
    <div className="App">
      <h1>Todo App with Image</h1>

      {/* Image Section */}
      <div className="image-section">
        <img
          src={`${API_BASE_URL}/latest-image`}
          alt="Random"
          style={{ maxWidth: "100%", height: "auto", border: "1px solid #ccc" }}
        />
      </div>

      {/* Todo Section */}
      <div className="todo-section">
        <h2>Todos</h2>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.task}</li>
          ))}
        </ul>
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
