import "./stylespages.css";
import { useLoaderData, useNavigation, Await } from "react-router-dom";
import { Nav } from "../Nav";
import "./stylespages.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function User_info() {
  const [spinner, setSpinner] = useState(false);
  const [post, setPost] = useState([]);
  const [todo, setTodo] = useState([]);

  const { data } = useLoaderData();
  //console.log("data", data);

  let userId = data.id;

  useEffect(() => {
    // axios
    //   .get(`http://127.0.0.1:3000/posts?userId=${userId}`)
    //   .then((response) => {
    //     console.log(response);
    //     setPost(response.data);
    //   });
    let endpoints = [
      `http://127.0.0.1:3000/posts?userId=${userId}`,
      `http://127.0.0.1:3000/todos?userId=${userId}`,
    ];
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((data) => {
      console.log(data);
      setPost(data[0].data);
      setTodo(data[1].data);
    });
  }, []);

  const { state } = useNavigation();

  console.log("user state", state); //idle - There is no navigation pending, this page is not navigating to another router/page

  return (
    <div>
      <Nav />

      <div className={spinner ? "loading-spinner" : ""}>
        <div className="container">
          <h1 className="page-title">{data.name}</h1>
          <div className="page-subtitle">{data.email}</div>
          <div>
            <b>Company:</b> {data.company.name}
          </div>
          <div>
            <b>Website:</b> {data.website}
          </div>
          <div>
            <b>Address:</b>{" "}
            {data.address.street +
              "," +
              data.address.suite +
              "," +
              data.address.city +
              "," +
              data.address.zipcode}
          </div>
          <h3 className="mt-4 mb-2">Posts</h3>
          <div className="card-grid">
            {post.map((item) => {
              return (
                <div className="card" key={item.id}>
                  <div className="card-header">{item.title}</div>
                  <div className="card-body">
                    <div className="card-preview-text">{item.body}</div>
                  </div>
                  <div className="card-footer">
                    <Link to={"/posts/" + item.id.toString()}>view</Link>
                  </div>
                </div>
              );
            })}
          </div>
          <h3 className="mt-4 mb-2">Todos</h3>
          <ul>
            {todo.map((item) => {
              return (
                <li
                  key={item.id}
                  className={item.completed ? "strike-through" : ""}
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
