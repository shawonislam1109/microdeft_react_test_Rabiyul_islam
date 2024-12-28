import CourseAdd from "../../pages/course/AddCourse";
import Course from "../../pages/course/Course";

const privateRoutes = [
  {
    path: "",
    element: <Course />,
  },
  {
    path: "/course/add",
    element: <CourseAdd />,
  },
];
export { privateRoutes };
