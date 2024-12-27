import { createBrowserRouter } from "react-router-dom";
import { privateRoutes } from "./private/Private";
import { publicRoutes } from "./public/Public";
import AuthenticationGuard from "./AuthenticateRoute";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticationGuard>
        <Home />
      </AuthenticationGuard>
    ),
    children: [
      {
        ...privateRoutes.map((route) => ({
          ...route,
        })),
      },
    ],
  },
  ...publicRoutes,
]);

export default router;
