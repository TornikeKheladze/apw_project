import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
  permissions: [],
  users: [],
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    saveRoles: (state, { payload }) => {
      state.roles = payload;
    },
    savePermissions: (state, { payload }) => {
      state.permissions = payload;
    },
    saveUsers: (state, { payload }) => {
      state.users = payload;
    },
    saveRolesDepOnPrev: (state, { payload }) => {
      state.roles = [...state.roles, ...payload];
    },
  },
});

export const { saveRoles, savePermissions, saveUsers, saveRolesDepOnPrev } =
  roleSlice.actions;

export default roleSlice.reducer;
