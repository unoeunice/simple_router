import "./stylespages.css";
import { useLoaderData } from "react-router-dom";
import { Nav } from "../Nav";
export function AllComments() {
  const comments_info = useLoaderData();

  console.log(comments_info.data);
  return <div>all comments</div>;
}
