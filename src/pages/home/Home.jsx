import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Course from "../course/Course";

const Home = () => {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
};

export default Home;
