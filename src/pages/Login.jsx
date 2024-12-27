import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/authentication.api.service";

const LoginPage = () => {
  // RTK QUERY HOOKS  USER

  const [userLogin, { data, isLoading, isSuccess }] = useLoginMutation();

  // navigate hooks
  const navigate = useNavigate();

  // Validation schema with Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    userLogin({ data, navigate });
    // Handle login logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="flex flex-row items-center bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        {/* Left Section - Icon */}
        <div className="flex flex-col items-center justify-center bg-blue-500 text-white w-1/3 p-6 rounded-l-lg">
          <div className="flex justify-center items-center w-20 h-20 bg-blue-600 rounded-full">
            <FiUser className="text-white text-4xl" />
          </div>
          <h2 className="text-2xl font-semibold mt-4">Welcome Back!</h2>
          <p className="text-sm text-gray-200 mt-2 text-center">
            Enter your credentials to access your account.
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="flex flex-col justify-center w-2/3 p-8">
          <h3 className="text-xl font-semibold text-gray-700 text-center mb-6">
            Login
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Input */}
            <div>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                      errors.email
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-300"
                    }`}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    placeholder="Password"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                      errors.password
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-300"
                    }`}
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {isLoading ? "loading...." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-500 text-center mt-6">
            Dont have an account?{" "}
            <Link to="/auth/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
