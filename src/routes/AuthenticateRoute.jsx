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

  // Token from localStorage
  const token = localStorage.getItem("token");

  // If auth state isn't initialized, show loading spinner
  // if (auth.isInitialized === false || auth.isInitialized === undefined) {
  //   return <LoadingSpinner />;
  // }

  // UseEffect to handle token setting and redirection logic
  useEffect(() => {
    if (token && !auth.token) {
      // Set token in Redux store if not already set
      dispatch(setToken({ token }));
    }

    if (auth.isInitialized === false || !token) {
      // Redirect to login page if token is not found or auth state isn't initialized
      navigate("/auth/login", {
        state: {
          from: location.pathname,
        },
        replace: true,
      });
    }
  }, [token, auth, dispatch, navigate, location]);

  return children;
};

export default AuthenticationGuard;
