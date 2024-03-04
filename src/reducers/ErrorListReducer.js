import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ourErrorList: [],
  ownerErrorList: [],
};

export const errorListReducer = createSlice({
  name: "errorList",
  initialState,
  reducers: {
    saveOurErrorList: (state, { payload }) => {
      state.ourErrorList = payload;
    },
    saveOwnerErrorList: (state, { payload }) => {
      state.ownerErrorList = payload;
    },
  },
});

export const { saveOurErrorList, saveOwnerErrorList } =
  errorListReducer.actions;

export default errorListReducer.reducer;
