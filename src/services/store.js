import { configureStore } from "@reduxjs/toolkit";
import RoleReducer from "reducers/RoleReducer";
import RootReducers from "reducers/RootReducers";
import UserReducer from "reducers/UserReducer";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    role: RoleReducer,
    root: RootReducers,
  },
});
