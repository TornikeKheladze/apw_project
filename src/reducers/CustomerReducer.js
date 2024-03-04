import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  customer: {},
};

export const customerReducer = createSlice({
  name: "customers",
  initialState,
  reducers: {
    saveCustomers: (state, { payload }) => {
      state.customers = payload;
    },
    saveCustomer: (state, { payload }) => {
      state.customer = payload;
    },
  },
});

export const { saveCustomers, saveCustomer } = customerReducer.actions;

export default customerReducer.reducer;
