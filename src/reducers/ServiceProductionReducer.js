import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceProductions: [],
  serviceProduction: {},
};

export const serviceProductionReducer = createSlice({
  name: "serviceProduction",
  initialState,
  reducers: {
    saveServiceProductions: (state, { payload }) => {
      state.serviceProductions = payload;
    },
    saveServiceProduction: (state, { payload }) => {
      state.serviceProduction = payload;
    },
  },
});

export const { saveServiceProductions, saveServiceProduction } =
  serviceProductionReducer.actions;

export default serviceProductionReducer.reducer;
