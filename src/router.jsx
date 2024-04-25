import { createBrowserRouter } from "react-router-dom";
import { Todos } from "./pages/Todos";
import { Users } from "./pages/Users";
import { Posts } from "./pages/Posts";
import { Post_info } from "./pages/Post_info";
import { User_info } from "./pages/User_info";

import { Error } from "./pages/Error";

import { Wrap } from "./pages/Wrap";

import axios from "axios";
import "./pages/stylespages.css";

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
    errorElement: <Error />,
    element: <Wrap />,

    children: [
      { index: true, element: <Posts /> },
      {
        path: ":id",
        errorElement: <Error />,

        element: <Post_info />, //Post_info receive the fetch result from loader
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
