import { Link } from "react-router-dom";
import { Nav } from "../Nav";

export function User({ data }) {
  let id = data.id;
  return (
    <div>
      <div className="container">
        <div className="card-grid">
          <div className="card">
            <div className="card-header">{data.name}</div>
            <div className="card-body">
              <div>{data.company.name}</div>
              <div>{data.website}</div>
              <div>{data.email}</div>
            </div>
            <div className="card-footer">
              <Link to={"/users/" + id.toString()}>View</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
