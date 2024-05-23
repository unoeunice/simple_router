import { Nav } from "../Nav";
import { Post } from "./Post";
import { Error } from "./Error";
import { useEffect, useState } from "react";
import "./stylespages.css";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import { Form, Link, useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Posts() {
  const [post, setPost] = useState([]);
  const [spinner, setSpinner] = useState(false);

  /*react-router-dom doesn't use the queryString for route path matching. 
 Access the query params in the component via the useSearchParams hook. */

  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  const author = searchParams.get("userId");

  //const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:3000/posts").then((response) => {
      console.log(query);
      let data = response.data;

      const filtered_post = data.filter((item) => item.title.includes(query));

      //console.log(filtered_post);
      setPost(filtered_post);
    });
  }, [query]);

  useEffect(() => {
    axios.get("http://127.0.0.1:3000/posts").then((response) => {
      // console.log(author);
      let data = response.data;

      const filtered_post = data.filter((item) => item.userId == author);

      //console.log(filtered_post);
      setPost(filtered_post);
    });
  }, [author]);

  useEffect(() => {
    setSpinner(true);

    axios.get("http://127.0.0.1:3000/posts").then((response) => {
      setPost(response.data);
      setSpinner(false);
    });
  }, []);

  return (
    <div>
      <Nav />

      <Form className="form mb-4">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select type="search" name="userId" id="userId">
              <option value="">Any</option>
              <option value="1">Leanne Graham</option>
              <option value="2">Ervin Howell</option>
              <option value="3">Clementine Bauch</option>
              <option value="4">Patricia Lebsack</option>
              <option value="5">Chelsey Dietrich</option>
              <option value="6">Mrs. Dennis Schulist</option>
              <option value="7">Kurtis Weissnat</option>
              <option value="8">Nicholas Runolfsdottir V</option>
              <option value="9">Glenna Reichert</option>
              <option value="10">Clementina DuBuque</option>
            </select>
          </div>
          <button className="btn">Filter</button>
        </div>
      </Form>

      <div className="title-btns">
        <Link className="btn btn-outline" to="/posts/new">
          New
        </Link>
      </div>

      <div className={spinner ? "loading-spinner" : ""}>
        <h1 className="page-title">Posts</h1>

        {post.map((item) => {
          return <Post key={item.id} data={item} />;
        })}
      </div>
    </div>
  );
}
