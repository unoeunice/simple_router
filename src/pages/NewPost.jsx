import "./stylespages.css";
import { Nav } from "../Nav";
import { Form, Link } from "react-router-dom";

export function NewPost() {
  return (
    <div>
      <Nav />
      <div className="container">
        <h1 className="page-title">New Post</h1>

        <Form method="post" className="form">
          <div className="form-row">
            <div className="form-group error">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title" />
              <div className="error-message">Required</div>
            </div>
            <div className="form-group">
              <label htmlFor="userId">Author</label>
              <select name="userId" id="userId">
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
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea className="body" name="body"></textarea>
            </div>
          </div>
          <div className="form-row form-btn-row">
            <Link className="btn btn-outline" to="/posts">
              Cancel
            </Link>
            <button className="btn">Save</button>
          </div>
        </Form>
      </div>
    </div>
  );
}
