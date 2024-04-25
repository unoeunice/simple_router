import "./stylespages.css";
import { useLoaderData } from "react-router-dom";
import { Nav } from "../Nav";
import { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { Error } from "./Error";

import axios from "axios";

export function Todos() {
  const [todo, setTodo] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [err, setErr] = useState(false);
  useEffect(() => {
    setSpinner(true);
    axios.get("http://127.0.0.1:3000/todos").then((response) => {
      setTodo(response.data);
      setSpinner(false);
    });
  }, []);

  return (
    <div>
      <Nav />

      <div className={spinner ? "loading-spinner" : ""}>
        {" "}
        <h1 className="page-title">Todos</h1>
        {todo.map((item) => {
          return <Todo key={item.id} data={item} />;
        })}
      </div>
    </div>
  );
}
