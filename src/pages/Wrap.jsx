import { useNavigation, Outlet } from "react-router-dom";
import { Nav } from "../Nav";

export const Wrap = () => {
  const { state } = useNavigation();

  console.log(state);

  if (state === "loading") {
    return (
      <div>
        <Nav />
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return <Outlet />; //call the children of this route
};
