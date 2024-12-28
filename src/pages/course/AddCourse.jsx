import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCreateCourseMutation } from "../../api/course.api.service";
import { useSelector } from "react-redux";

const CourseAdd = () => {
  //  ===// RTK QUERY HOOKS //======
  const [createCourse, { isLoading }] = useCreateCourseMutation();

  // === //USE SELECTOR USE FOR CASH END POINTS //======
  const { page } = useSelector((state) => state.auth);

  //  use navigate hooks
  const navigate = useNavigate();

  // Validation schema for the form
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Course title is required"),
    description: Yup.string().required("Course description is required"),
    badge_text: Yup.string().required("Badge text is required"),
    badge_color: Yup.string().required("Badge color is required"),
    instructor_name: Yup.string().required("Instructor name is required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // handle submit
  const onSubmit = async (data) => {
    createCourse({ data, navigate, query: page });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Course Create
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title Input */}
          <div>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Course Title"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                    errors.title
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
              )}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title?.message}
              </p>
            )}
          </div>

          {/* Badge Text Input */}
          <div>
            <Controller
              name="badge_text"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Badge Text"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                    errors.badge_text
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
              )}
            />
            {errors.badge_text && (
              <p className="text-red-500 text-sm mt-1">
                {errors.badge_text?.message}
              </p>
            )}
          </div>

          {/* Badge Color Input */}
          <div>
            <Controller
              name="badge_color"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Badge Color"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                    errors.badge_color
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
              )}
            />
            {errors.badge_color && (
              <p className="text-red-500 text-sm mt-1">
                {errors.badge_color?.message}
              </p>
            )}
          </div>

          {/* Instructor Name Input */}
          <div>
            <Controller
              name="instructor_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Instructor Name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                    errors.instructor_name
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
              )}
            />
            {errors.instructor_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.instructor_name?.message}
              </p>
            )}
          </div>

          {/* Description Input */}
          <div>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Course Description"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                    errors.description
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                  }`}
                  rows={4}
                />
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description?.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isLoading ? "Loading...." : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseAdd;
