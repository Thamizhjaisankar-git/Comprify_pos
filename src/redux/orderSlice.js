import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [
    {
      id: 1,
      customer_name: "John Doe",
      total_amount: 500,
      payment_status: "Completed",
      products: [{ name: "Item A", price: 250, quantity: 2 }],
    },
    {
      id: 2,
      customer_name: "Alice Smith",
      total_amount: 1200,
      payment_status: "Pending",
      products: [{ name: "Item B", price: 400, quantity: 3 }],
    },
  ],
  selectedOrder: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrderDetails: (state, action) => {
      state.selectedOrder = state.orders.find(
        (order) => order.id === action.payload
      ) || null;
    },
    processRefund: (state, action) => {
      const order = state.orders.find((order) => order.id === action.payload);
      if (order) {
        order.payment_status = "Refunded";
      }
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const { setOrderDetails, processRefund, addOrder } = orderSlice.actions;
export default orderSlice.reducer;
