import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
  service: {},
};

export const serviceReducer = createSlice({
  name: "services",
  initialState,
  reducers: {
    saveServices: (state, { payload }) => {
      state.services = payload;
    },
    saveService: (state, { payload }) => {
      state.service = payload;
    },
  },
});

export const { saveServices, saveService } = serviceReducer.actions;

export default serviceReducer.reducer;
