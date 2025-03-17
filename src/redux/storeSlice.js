import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeInfo: null,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    saveStoreInfo: (state, action) => {
      state.storeInfo = action.payload;
    },
  },
});

export const { saveStoreInfo } = storeSlice.actions;
export default storeSlice.reducer;
