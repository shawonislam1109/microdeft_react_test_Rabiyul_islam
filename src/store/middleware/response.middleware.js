import { isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";
// third-party
import { toast } from "sonner";

export const responseMiddleware = () => (next) => (action) => {
  const requestMethod = action.meta?.baseQueryMeta?.request?.method;

  // -> IF RESPONSE IS UNAUTHORIZE CLEAR LOCALSOTRAGE ROOT-BILLING-TOKEN AND REDIRECT TO LOGIN PAGE
  if (isRejectedWithValue(action)) {
    let errorMessage = action.payload?.data;

    if (
      errorMessage?.statusCode === 401 &&
      !window.location.href.includes("/auth/login")
    ) {
      toast.error(errorMessage);

      // NAVIGATE TO LOGIN PAGE
      window.location = "/auth/login";
    }
  }

  if (isRejectedWithValue(action) && requestMethod !== "GET") {
    let errorMessage = action.payload?.data;
    if (typeof errorMessage?.status_message === "string") {
      errorMessage = errorMessage?.status_message;
    } else if (typeof errorMessage === "object") {
      errorMessage = errorMessage?.status_message;
    }
    toast.error(`${errorMessage ? errorMessage : action.payload?.error}`);
  }

  if (isFulfilled(action) && requestMethod !== "GET") {
    console.log(action.payload?.status_message);
    const isString = typeof action.payload?.status_message === "string";
    if (isString) {
      toast.success(action.payload.status_message);
    }
  }
  return next(action);
};
