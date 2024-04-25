import { Nav } from "../Nav";
import "./stylespages.css";
import { User } from "./User";
import { useEffect, useState } from "react";
import "./stylespages.css";
import axios from "axios";

export function Users() {
  const [user, setUser] = useState([]);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setSpinner(true);
    axios.get("http://127.0.0.1:3000/users").then((response) => {
      setUser(response.data);
      setSpinner(false);
    });
  }, []);

  return (
    <div>
      <Nav />

      {/* className={spinner ? "loading-spinner" : ""} */}
      <div className={spinner ? "loading-spinner" : ""}>
        <h1 className="page-title">Users</h1>

        {user.map((item) => {
          return <User key={item.id} data={item} />;
        })}
      </div>
    </div>
  );
}
