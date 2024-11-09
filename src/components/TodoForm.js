import React, { useState } from "react";

export default function TodoForm({ todos, addToDo }) {
  let [title, setTitle] = useState("");

  let submitHanlder = (e) => {
    let todo = {
      id: todos.length + 1,
      title,
      completed: false,
    };
    e.preventDefault();
    addToDo(todo);
    setTitle("");
  };
  return (
    <form onSubmit={submitHanlder}>
      <p>{title}</p>
      <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
    </form>
  );
}
