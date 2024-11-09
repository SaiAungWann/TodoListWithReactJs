import "./reset.css";
import "./App.css";
import TodoList from "./components/TodoList";
import CheckAll from "./components/CheckAll";
import Filter from "./components/Filter";
import Clear from "./components/Clear";
import { useCallback, useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";

function App() {
  let [todos, setTodos] = useState([]);
  let [filterTodos, setFilterTodos] = useState(todos);

  // fetch all todos
  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos);
        setFilterTodos(todos);
      });
  }, []);

  let filterHandler = useCallback(
    (filter) => {
      if (filter === "all") {
        setFilterTodos(todos);
      }
      if (filter === "active") {
        setFilterTodos(todos.filter((t) => !t.completed));
      }
      if (filter === "completed") {
        setFilterTodos(todos.filter((t) => t.completed));
      }
    },
    [todos]
  );

  // add to do item
  let addToDo = (todo) => {
    // server side
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((todo) => {
        setTodos([...todos, todo]);
      });

    // client side
    setTodos((prevState) => [...prevState, todo]);
  };

  // delete to do item
  let deleteToDo = (TodoId) => {
    // server side
    fetch(`http://localhost:3001/todos/${TodoId}`, {
      method: "DELETE",
    });

    // client side
    setTodos((prevState) => prevState.filter((todo) => todo.id !== TodoId));
  };

  // update to do item
  let updateToDo = (todo) => {
    // server side
    fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    // client side
    setTodos((prevState) => {
      return prevState.map((t) => {
        if (t.id === todo.id) {
          return todo;
        }
        return t;
      });
    });
  };

  let remainingCount = todos.filter((todo) => !todo.completed).length;

  let checkAll = () => {
    todos.forEach((todo) => {
      todo.completed = true;
      updateToDo(todo);
    });
  };

  let clearCompleted = () => {
    todos.forEach((todo) => {
      if (todo.completed) {
        deleteToDo(todo.id);
      }
    });
  };
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        {/* form */}
        <TodoForm todos={todos} addToDo={addToDo} />

        {/* todo list */}
        <TodoList
          todos={filterTodos}
          deleteToDo={deleteToDo}
          updateToDo={updateToDo}
        />

        {/* check all and remaining */}
        <CheckAll checkAll={checkAll} remainingCount={remainingCount} />

        {/* filter and clear */}
        <div className="other-buttons-container">
          <Filter filterHandler={filterHandler} />
          <Clear clearCompleted={clearCompleted} />
        </div>
      </div>
    </div>
  );
}

export default App;
