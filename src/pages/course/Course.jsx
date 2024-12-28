import { useGetCourseQuery } from "../../api/course.api.service";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../store/reducer/auth.reducer";

const Course = () => {
  const { page } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Fetch data using RTK Query
  const { data, isLoading, error, isFetching } = useGetCourseQuery(page);

  // Handle loading and error states
  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Something went wrong! Try again.
      </p>
    );
  }

  // Extract courses and meta information
  const courses = data?.data?.data || [];
  const meta = data?.data?.meta || {};
  const links = meta.links || [];

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course?.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={course?.image}
              alt={course?.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <div
                className={`text-xs uppercase font-bold text-${course?.badge?.color}-500 mb-2`}
              >
                {course?.badge?.text}
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {course?.title}
              </h2>
              <p className="text-gray-600 mb-2">{course?.description}</p>
              <p className="text-sm text-gray-500">
                Instructor: {course?.instructor}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center space-x-2">
        {links?.map((link, index) => (
          <button
            key={index}
            onClick={() => {
              if (link.url) {
                console.log("sldkfjsldfj");
                const page = new URL(link.url).searchParams.get("page");
                dispatch(setPage(Number(page)));
              }
            }}
            className={`px-4 py-2 rounded-lg ${
              link.active
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
            disabled={!link.url}
          >
            {link.label.replace("&laquo;", "«").replace("&raquo;", "»")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Course;
