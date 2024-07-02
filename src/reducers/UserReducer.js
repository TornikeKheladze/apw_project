import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: {},
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
    saveUsers: (state, action) => {
      state.users = action.payload;
    },
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    saveAuthorizedUser: (state, action) => {
      state.authorizedUser = action.payload;
    },
  },
});

export const { saveUsers, saveUser, saveAuthorizedUser } = userSlice.actions;

export default userSlice.reducer;
