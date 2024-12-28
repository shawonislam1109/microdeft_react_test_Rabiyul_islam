import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: null, // Initialize token from localStorage
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

    resetLogging(state) {
      state.isLogging = false;
    },
  },
});

export const { setToken, logout, setPage, resetLogging } = authSlice.actions;
export default authSlice.reducer;
