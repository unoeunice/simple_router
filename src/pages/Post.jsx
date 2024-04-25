import "./stylespages.css";
import { Link } from "react-router-dom";

export function Post({ data }) {
  let id = data.id;
  return (
    <div>
      <div className="container">
        <div className="card-grid">
          <div className="card">
            <div className="card-header">{data.title}</div>
            <div className="card-body">
              <div className="card-preview-text">{data.body}</div>
            </div>
            <div className="card-footer">
              {/* <a className="btn" href="post.html">
                View
              </a> */}
              <Link to={"/posts/" + id.toString()}>View</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
