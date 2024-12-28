import { api } from "../config/api.config";

export const courseApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCourse: build.query({
      query: (page) => {
        return {
          url: `/course?page=${page}`,
          method: "GET",
        };
      },
    }),
    createCourse: build.mutation({
      query: ({ data }) => {
        return {
          url: "/course",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted({ navigate, query }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data?.data);

          // Updating cache for getCourse query
          dispatch(
            api.util.updateQueryData("getCourse", query, (draft) => {
              console.log(
                "Before cache update:",
                JSON.parse(JSON.stringify(draft))
              );

              // Safely check if draft.data exists and mutate the data
              if (draft?.data) {
                draft.data.data.unshift(data?.data);
              }
            })
          );
          navigate("/");
        } catch (error) {
          console.log("Create course error", error);
        }
      },
    }),
  }),
});

export const { useCreateCourseMutation, useGetCourseQuery } = courseApi;
