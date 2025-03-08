import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [], // List of customers
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
  },
});

export const { addCustomer } = customerSlice.actions;
export default customerSlice.reducer;
