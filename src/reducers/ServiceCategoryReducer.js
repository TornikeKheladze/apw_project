import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceCategories: [],
  serviceCategory: {},
};

export const serviceCategoryReducer = createSlice({
  name: "serviceCategories",
  initialState,
  reducers: {
    saveServiceCategories: (state, { payload }) => {
      state.serviceCategories = payload;
    },
    saveServiceCategory: (state, { payload }) => {
      state.serviceCategory = payload;
    },
  },
});

export const { saveServiceCategories, saveServiceCategory } =
  serviceCategoryReducer.actions;

export default serviceCategoryReducer.reducer;
