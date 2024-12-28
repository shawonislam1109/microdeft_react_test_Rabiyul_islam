import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: null,
  isLogging: false,
  page: 1,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, { payload }) {
      const { token } = payload;
      state.isLogging = true;
      state.token = token;
    },

    logout(state) {
      state.isLogging = false;
      state.token = null;
      state.user = {};
      localStorage.clear();
    },

    setPage(state, { payload }) {
      state.page = payload;
    },
  },
});

export const { setToken, logout, setPage } = authSlice.actions;
export default authSlice.reducer;
