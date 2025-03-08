import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // List of products
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload); // Add new product to the list
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addProduct, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;
