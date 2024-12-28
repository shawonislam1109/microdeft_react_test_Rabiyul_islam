import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setToken } from "../store/reducer/auth.reducer";
import { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const AuthenticationGuard = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // TOKEN GET FROM LOCAL STORAGE
  const token = localStorage.getItem("token");
  // check redux auth reducer is  initialization
  if (auth.isInitialized !== undefined && !auth.isInitialized) {
    return <LoadingSpinner />;
  }

  // Ensure auth state is initialized before proceeding
  // useEffect(() => {
  if (token) {
    dispatch(setToken({ token })); // Set token in Redux store
  }

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
  }
  // }, [auth.isInitialized, token, dispatch, navigate, location, auth]);

  return children;
};

export default AuthenticationGuard;
