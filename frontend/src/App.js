import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = () => {
    fetch("http://localhost:8080/todos")
      .then((res) => res.json())
      .then((data) => setTodos(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = () => {
    fetch("http://localhost:8080/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, done: false }),
    })
      .then((res) => res.json())
      .then((newTodo) => setTodos([...todos, newTodo]));

    setTitle("");
  };

  const toggleTodo = (id) => {
    fetch("http://localhost:8080/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then(() => fetchTodos());
  };

  const deleteTodo = (id) => {
    fetch("http://localhost:8080/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then(() => fetchTodos());
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Todo App</h1>

      <div className="flex mb-6 w-full max-w-md">
        <input
          className="flex-grow p-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tambah todo..."
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 transition"
        >
          Tambah
        </button>
      </div>

      <ul className="w-full max-w-md space-y-2">
        {todos.map((t) => (
          <li
            key={t.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center cursor-pointer"
          >
            <span
              onClick={() => toggleTodo(t.id)}
              className={t.done ? "line-through text-gray-400" : ""}
            >
              {t.title}
            </span>
            <button
              onClick={() => deleteTodo(t.id)}
              className="text-red-500 hover:text-red-700 ml-4"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
