import "./stylespages.css";

export function Todo({ data }) {
  return (
    <div>
      <div className="container">
        <ul>
          <li className={data.completed ? "strike-through" : ""}>
            {data.title}
          </li>{" "}
        </ul>
      </div>
    </div>
  );
}
