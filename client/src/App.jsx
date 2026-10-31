import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError("Could not load todos. Is the server running?");
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const newTodo = await res.json();
      setTodos([newTodo, ...todos]);
      setText("");
      setError("");
    } catch (err) {
      setError("Could not add todo");
    }
  };

  const toggleTodo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "PUT" });
      const updated = await res.json();
      setTodos(todos.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError("Could not update todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      setError("Could not delete todo");
    }
  };

  return (
    <div className="container">
      <h1>Todo App</h1>

      <form onSubmit={addTodo} className="form">
        <input
          type="text"
          placeholder="What do you need to do?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul className="list">
        {todos.map((todo) => (
          <li key={todo._id} className={todo.done ? "done" : ""}>
            <span onClick={() => toggleTodo(todo._id)}>{todo.text}</span>
            <button className="delete" onClick={() => deleteTodo(todo._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && !error && <p className="empty">No todos yet.</p>}
    </div>
  );
}

export default App;
