import "./stylespages.css";
import { useLoaderData } from "react-router-dom";
import { Nav } from "../Nav";
import { Link, useNavigation, Outlet } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";

export function Post_info() {
  const information = useLoaderData();

  let post_info = information[0].data;

  let postId = post_info.id;

  let userId = post_info.userId;

  let comments = information[1].data;

  const [user, setUser] = useState("");

  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/users/${userId}`).then((response) => {
      setUser(response.data.name);
    });
  }, []);

  return (
    <div>
      <Nav />
      {/* {console.log(post_info)}

      {console.log(comments)} */}
      <div className="title-btns">
        <Link
          className="btn btn-outline"
          to={`/posts/${postId.toString()}/edit`}
        >
          Edit
        </Link>
      </div>

      <div className="container">
        <h1 className="page-title">{post_info.title}</h1>

        <span className="page-subtitle">
          By: <Link to={"/users/" + userId.toString()}>{user}</Link>
        </span>
        <div>{post_info.body}</div>
        <h3 className="mt-4 mb-2">Comments</h3>
        <div className="card-stack">
          {comments.map((item) => {
            return (
              <div key={item.id} className="card">
                <div className="card-body">
                  <div className="text-sm mb-1">{item.name}</div>
                  {item.body}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/*
  if not use useEffect, this console.log (here) will keep looping because the setUser will trigger re-render again and again
  if you put inside useEffect, it render once when it first mounted as it is with [] as dependency , if you dont put dependency
  in useEffect, it also keeps re-rendering*/

/*
    let haha = axios
    .get(`http://127.0.0.1:3000/users/${userId}`)
    .then((response) => {
      return response.data.name;
    });

    console.log(haha)=>Promise {<pending>}

    coz it is not resolved
    promise can only be resolved inside then
    so you can put setUser inside then statement to get the user in rendering 


    kyle:
    const promise = axios.get(url).then(response => response.data)
return <div>{promise}</div>
It should be pretty obvious that your promise variable is just a Promise object and not the actual data being returned from your Promise. You would need to await your Promise in order to get the value, but since React components cannot be async (at least in normal React code) this is not possible. 
This is why we must use useEffect instead anytime we have async code inside our components.




   */

/* Moreover, we cannot put axios in return in react because React doesn't know how to
     render a promise as a UI element because a promise is not a valid React child. */
