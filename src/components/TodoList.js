import React from "react";
import Todo from "./Todo";

export default function TodoList({
  todos,
  deleteToDo,
  updateToDo,
  filterTodos,
}) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        return (
          <Todo
            todo={todo}
            deleteToDo={deleteToDo}
            updateToDo={updateToDo}
            key={todo.id}
          />
        );
      })}
    </ul>
  );
}
