import { api } from "../../config/api.config";
// slice import
import auth from "../reducer/auth.reducer";

const reducers = {
  [api.reducerPath]: api.reducer,

  // reducers
  auth,
};

export default reducers;
