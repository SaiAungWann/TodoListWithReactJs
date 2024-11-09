import React, { useState } from "react";

export default function Todo({ todo, deleteToDo, updateToDo }) {
  let [isEdit, setIsEdit] = useState(false);
  let [title, setTitle] = useState(todo.title);

  let updateSubmitHandler = (e) => {
    e.preventDefault();

    let updatedTodo = {
      id: todo.id,
      title,
      completed: todo.completed,
    };
    updateToDo(updatedTodo);
    setIsEdit(false);
  };

  let handleCheckBox = () => {
    let updatedTodo = {
      id: todo.id,
      title,
      completed: !todo.completed,
    };
    updateToDo(updatedTodo);
  };

  return (
    <li className="todo-item-container" key={todo.id}>
      <div className="todo-item">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckBox}
        />
        {!isEdit && (
          <span
            className={`todo-item-label ${
              todo.completed ? "line-through" : ""
            }`}
            onDoubleClick={() => setIsEdit(true)}
          >
            {todo.title}
          </span>
        )}
        {isEdit && (
          <form onSubmit={updateSubmitHandler}>
            <input
              type="text"
              className="todo-item-input"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </form>
        )}
      </div>
      <button className="x-button" onClick={() => deleteToDo(todo.id)}>
        <svg
          className="x-button-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}
