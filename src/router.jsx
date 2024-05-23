import { createBrowserRouter, redirect, useActionData } from "react-router-dom";
import { Todos } from "./pages/Todos";
import { Users } from "./pages/Users";
import { Posts } from "./pages/Posts";
import { Post_info } from "./pages/Post_info";
import { User_info } from "./pages/User_info";
import { NewPost } from "./pages/NewPost";
import { Edit } from "./pages/Edit";

import { Error } from "./pages/Error";

import { Wrap } from "./pages/Wrap";

import axios from "axios";
import "./pages/stylespages.css";
import { v4 as uuidv4 } from "uuid";

export const router = createBrowserRouter([
  { path: "/", element: <Todos /> },
  {
    path: "/todos",
    errorElement: <Error />,
    element: <Todos />,
  },
  {
    path: "/users",
    errorElement: <Error />,
    element: <Wrap />,

    children: [
      { index: true, element: <Users /> },

      {
        path: ":id",
        errorElement: <Error />,
        element: <User_info />, //User_info receive the fetch result from loader

        loader: ({ params, request: { signal } }) => {
          return axios.get(`http://127.0.0.1:3000/users/${params.id}`, {
            signal,
          });
        },
      },
    ],
  },
  {
    path: "/posts",
    // errorElement: <Error />,
    element: <Wrap />,

    children: [
      {
        index: true,
        element: <Posts />,
        /*The query parameters (query and userId) appear in the URL because the default form submission method is GET, 
        which appends the form data to the URL as query parameters.
         This is standard behavior for forms using the GET method,  */

        // loader: ({ request: { url, signal } }) => {
        //   console.log("url", url);
        //   const params = new URL(url).searchParams;
        //   console.log(params);

        //   const query = params.get("query");
        //   console.log(query, "query");

        //   return axios.get("http://127.0.0.1:3000/posts", {
        //     signal,
        //   });

        //   return redirect("/posts/");
        // },
      },

      {
        path: ":id",

        errorElement: <Error />,

        element: <Post_info />,

        //Post_info receive the fetch result from loader
        loader: ({ params, request: { signal } }) => {
          let endpoints = [
            `http://127.0.0.1:3000/posts/${params.id}`,
            `http://127.0.0.1:3000/posts/${params.id}/comments`,
          ];
          return axios.all(
            endpoints.map((endpoint) => axios.get(endpoint)),

            {
              signal,
            }
          );
        },
      },
      {
        path: ":id/edit",
        element: <Edit />,
        action: async ({ request, params }) => {
          const formData = await request.formData();

          let errors = [];

          let body = formData.get("body");
          let title = formData.get("title");
          let userId = formData.get("userId");

          console.log(params.id);

          if (title.length === 0) {
            errors.push({ id: uuidv4(), type: "title" }); //uuidv4()
          }

          if (body.length === 0) {
            errors.push({ id: uuidv4(), type: "body" });
          }

          if (userId == null) {
            errors.push({ id: uuidv4(), type: "author" });
          }

          if (errors.length) {
            return errors;
          }

          const newPost = await fetch(
            `http://127.0.0.1:3000/posts/${params.id}`,
            {
              method: "PUT",
              signal: request.signal,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId, id: params.id, title, body }),
            }
          ).then((res) => res.json());

          console.log(newPost);

          return redirect(`/posts/${params.id}`);
        },
      },
      {
        path: "new",
        element: <NewPost />,
        action: async ({ request }) => {
          let errors = [];
          const formData = await request.formData();

          let body = formData.get("body");
          let title = formData.get("title");
          let userId = formData.get("userId");

          if (title.length === 0) {
            errors.push({ id: uuidv4(), type: "title" }); //uuidv4()
          }

          if (body.length === 0) {
            errors.push({ id: uuidv4(), type: "body" });
          }

          if (userId == null) {
            errors.push({ id: uuidv4(), type: "author" });
          }

          if (errors.length) {
            return errors;
          }

          const newPost = await fetch("http://127.0.0.1:3000/posts", {
            method: "POST",
            signal: request.signal,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body, userId, id: uuidv4() }),
          }).then((res) => res.json());

          console.log(newPost);

          return redirect("/posts");
        },
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

/*
1.  when you press view to call posts/:id

 Wrap you are on route /posts, state ===loading is true because next page/route(posts/:id,<Post_info /> ) is being called to 
render(refer to useNavigation document )


=>loader spinning

 2. <Post_info /> has useLoaderData();
loader will fetch the data before the <Post_info /> renders

 =><Post_info />  will be rendered after the data is fetched 

 3. after the data is fetched=><Post_info />  will be rendered => state ====loading is false
 because the navigation is not pending now ,state is equal to idle

 //<Post_info> at this stage cannot be rendered yet because needs Wrap to return , as Wrap is parent element
 =>will render its return jxs instead

 4.<Post_info>  is ready to be render because the data is fetched
 => state ===loading is false => it called called the <Outlet/> inside the Wrap
  i.e. the children of the route /posts i.e. <Post_info /> now be rendered 

  */

/*errorElement
  When exceptions are thrown in loaders, actions, or component rendering, 
  instead of the normal render path for your Routes (<Route element>), the error path will be rendered */
