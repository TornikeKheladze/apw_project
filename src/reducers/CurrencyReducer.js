import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencies: [],
};

export const currencyReducer = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    saveCurrencies: (state, { payload }) => {
      state.currencies = payload;
    },
  },
});

export const { saveCurrencies } = currencyReducer.actions;

export default currencyReducer.reducer;
