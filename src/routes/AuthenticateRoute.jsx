import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setToken } from "../store/reducer/auth.reducer";
import { useEffect } from "react";

const AuthenticationGuard = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // TOKEN GET FROM LOCAL STORAGE
  const token = localStorage.getItem("token");

  // Ensure auth state is initialized before proceeding
  useEffect(() => {
    if (auth.isInitialized === false) {
      return; // Return early if authentication state is not initialized
    }

    if (!token) {
      // Redirect to login page if token doesn't exist
      navigate("/auth/login", {
        state: {
          from: location.pathname,
        },
        replace: true,
      });
    } else {
      // Dispatch token to Redux store if it's available
      dispatch(setToken({ token }));
    }
  }, [auth.isInitialized, token, dispatch, navigate, location]);

  return children;
};

export default AuthenticationGuard;
