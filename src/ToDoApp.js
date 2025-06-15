import React, { useState, useEffect, useRef } from "react";
import "./ToDoApp.css";
import icon from "./icon.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ToDoApp() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("data");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const value = text.trim();
    if (!value) {
      alert("You must write something!");
      return;
    }
    setTasks((prev) => [
      { id: Date.now(), text: value, completed: false, createdAt: Date.now() },
      ...prev,
    ]);
    setText("");
    inputRef.current?.focus();
  };

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditedText(task.text);
  };

  const saveEdit = (id) => {
    const trimmed = editedText.trim();
    if (trimmed) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
      );
    }
    setEditingId(null);
  };

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const filtered = tasks.filter((t) =>
    filter === "all"
      ? true
      : filter === "completed"
      ? t.completed
      : !t.completed
  );

  const sorted = [...filtered].sort((a, b) =>
    sort === "newest" ? b.createdAt - a.createdAt : a.text.localeCompare(b.text)
  );

  return (
    <div className="container">
      <div className="todo-app">
        <h2 className="todo-heading">
          To‑Do List <img src={icon} alt="icon" />
        </h2>

        <div className="row">
          <input
            ref={inputRef}
            type="text"
            id="input-box"
            placeholder="Add Task"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <div className="controls">
          <div className="filters">
            <button
              onClick={() => setFilter("all")}
              className={filter === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={filter === "active" ? "active" : ""}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={filter === "completed" ? "active" : ""}
            >
              Completed
            </button>
          </div>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">New First</option>
            <option value="alpha">A–Z</option>
          </select>
        </div>

        <ul id="list-container">
          {sorted.map((t) => (
            <li
              key={t.id}
              className={t.completed ? "checked" : ""}
              onClick={() => editingId === null && toggleTask(t.id)}
            >
              {editingId === t.id ? (
                <>
                  <input
                    className="edit-input"
                    value={editedText}
                    autoFocus
                    onChange={(e) => setEditedText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit(t.id)}
                  />
                  <button className="save-btn" onClick={() => saveEdit(t.id)}>
                    Save
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="task-text">{t.text}</span>
                  <div className="icons" onClick={(e) => e.stopPropagation()}>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      onClick={() => startEditing(t)}
                    />
                    <FontAwesomeIcon
                      data-testid="fa-icon"
                      icon={faTrash}
                      onClick={() => deleteTask(t.id)}
                    />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
