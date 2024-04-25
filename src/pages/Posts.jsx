import { Nav } from "../Nav";
import { Post } from "./Post";
import { Error } from "./Error";
import { useEffect, useState } from "react";
import "./stylespages.css";
import axios from "axios";

export function Posts() {
  const [post, setPost] = useState([]);
  const [spinner, setSpinner] = useState(false);

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
      <div className={spinner ? "loading-spinner" : ""}>
        <h1 className="page-title">Posts</h1>

        {console.log(typeof post)}
        {post.map((item) => {
          return <Post key={item.id} data={item} />;
        })}
      </div>
    </div>
  );
}
