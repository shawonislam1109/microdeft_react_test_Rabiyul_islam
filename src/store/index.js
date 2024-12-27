import { configureStore } from "@reduxjs/toolkit";
import { api } from "../config/api.config";

// import response middle ware
import { responseMiddleware } from "./middleware/response.middleware";

// import reducers
import reducers from "./reducer";

// config  redux store
export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(responseMiddleware),
});
