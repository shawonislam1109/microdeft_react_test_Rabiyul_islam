import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: null,
  isLogging: false,
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
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
