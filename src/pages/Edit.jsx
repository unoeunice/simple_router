import "./stylespages.css";
import { Nav } from "../Nav";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";

export function Edit() {
  let Errors = useActionData();
  const { state } = useNavigation();

  const submitting = state === "submitting";

  let x;
  let y;
  let z;

  //useActionData() may throw null/object, if dont check whether the return data is array, using map will throw error

  if (Array.isArray(Errors)) {
    Errors.map((item) => {
      if (item.type.includes("title")) {
        x = 1;
      } else if (item.type.includes("body")) {
        y = 1;
      } else if (item.type.includes("author")) {
        z = 1;
      }
    });
  }

  console.log(Errors);
  return (
    <div>
      <Nav />
      <div className="container">
        <h1 className="page-title">Edit Post</h1>

        <Form method="post" className="form">
          <div className="form-row">
            <div className="form-group">
              {" "}
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title" />
              <div className="form-group error">
                {x == 1 ? <div className="error-message">required</div> : null}
              </div>
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
              {z == 1 ? <div className="error-message">required</div> : null}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea className="body" name="body"></textarea>
              <div className="form-group error">
                {y == 1 ? <div className="error-message">required</div> : null}
              </div>
            </div>
          </div>
          <div className="form-row form-btn-row">
            <Link className="btn btn-outline" to="/posts">
              Cancel
            </Link>
            <button disabled={submitting} className="btn">
              {submitting ? "Loading" : "Save"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
