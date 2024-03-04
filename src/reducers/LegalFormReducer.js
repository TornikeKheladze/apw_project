import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  legalForms: [],
};

export const legalFormSlice = createSlice({
  name: "legalForm",
  initialState,
  reducers: {
    saveLegalForms: (state, { payload }) => {
      state.legalForms = payload;
    },
  },
});

export const { saveLegalForms } = legalFormSlice.actions;

export default legalFormSlice.reducer;
