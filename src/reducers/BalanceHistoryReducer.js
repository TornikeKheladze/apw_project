import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balanceHistoryTypes: [],
  balanceHistory: [],
  balance: [],
};

export const balanceHistoryReducer = createSlice({
  name: "balanceHistory",
  initialState,
  reducers: {
    saveBalanceHistoryTypes: (state, { payload }) => {
      state.balanceHistoryTypes = payload;
    },
    saveBalanceHistory: (state, { payload }) => {
      state.balanceHistory = payload;
    },
    saveBalance: (state, { payload }) => {
      state.balance = payload;
    },
  },
});

export const { saveBalanceHistoryTypes, saveBalanceHistory, saveBalance } =
  balanceHistoryReducer.actions;

export default balanceHistoryReducer.reducer;
