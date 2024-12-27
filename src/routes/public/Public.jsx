import LoginPage from "../../pages/Login";
import SignUpPage from "../../pages/Signup";

/**
 *this is public router handler
 * @Routes[]
 */
const publicRoutes = [
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <SignUpPage />,
  },
];
export { publicRoutes };
