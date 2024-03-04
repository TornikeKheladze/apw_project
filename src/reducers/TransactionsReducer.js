import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  transaction: {},
  payer: {},
  sumData: {},
};

export const transactionsReducer = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    saveTransactions: (state, { payload }) => {
      state.transactions = payload;
    },
    saveTransaction: (state, { payload }) => {
      state.transaction = payload;
    },
    savePayer: (state, { payload }) => {
      state.payer = payload;
    },
    saveSumData: (state, { payload }) => {
      state.sumData = payload;
    },
  },
});

export const { saveTransactions, saveTransaction, savePayer, saveSumData } =
  transactionsReducer.actions;

export default transactionsReducer.reducer;
