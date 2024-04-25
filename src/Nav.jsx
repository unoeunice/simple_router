import { Link } from "react-router-dom";
import "./pages/stylespages.css";
export function Nav() {
  return (
    // <nav>
    //   <ul>
    //     <li>
    //       <Link to="/todos">Todos</Link>
    //     </li>
    //     <li>
    //       <Link to="/posts">Posts</Link>
    //     </li>
    //     <li>
    //       <Link to="/users">Users</Link>
    //     </li>
    //   </ul>
    // </nav>
    <nav className="top-nav">
      <div className="nav-text-large">My App</div>
      <ul className="nav-list">
        <li>
          <Link to="/todos">Todos</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
  );
}
