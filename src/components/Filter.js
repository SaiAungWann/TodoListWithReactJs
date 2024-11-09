import React, { useEffect, useState } from "react";

export default function Filter({ filterHandler }) {
  let [filter, setFilter] = useState("all");

  useEffect(() => {
    filterHandler(filter);
  }, [filter, filterHandler]);
  return (
    <div>
      <button
        className={`button filter-button ${
          filter === "all" ? "filter-button-active" : ""
        }`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`button filter-button ${
          filter === "active" ? "filter-button-active" : ""
        }`}
        onClick={() => setFilter("active")}
      >
        Active
      </button>
      <button
        className={`button filter-button ${
          filter === "completed" ? "filter-button-active" : ""
        }`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
}
