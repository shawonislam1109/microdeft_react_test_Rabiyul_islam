import { api } from "../config/api.config";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ data }) => {
        return {
          url: "/login",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted({ navigate }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data?.data?.token);
          dispatch(api.util.resetApiState());
          navigate("/");
        } catch (error) {
          console.log("login error", error);
        }
      },
    }),

    // sign up
    signUp: build.mutation({
      query: ({ data }) => {
        return {
          url: "/register",
          method: "POST",
          body: data,
        };
      },
      // async onQueryStarted({ navigate }, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     navigate("/auth/login");
      //   } catch (error) {
      //     console.log("login error", error);
      //   }
      // },
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
