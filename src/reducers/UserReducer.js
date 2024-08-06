import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  authOrg: {},
  authorizedUser: {
    roles: [],
    superAdmin: false,
    isSip: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveAuthOrg: (state, action) => {
      state.authOrg = action.payload;
    },
    saveAuthorizedUser: (state, action) => {
      state.authorizedUser = action.payload;
    },
  },
});

export const { saveAuthOrg, saveAuthorizedUser } = userSlice.actions;

export default userSlice.reducer;
