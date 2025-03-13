import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suppliers: [], // List of suppliers
};

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    addSupplier: (state, action) => {
      state.suppliers.push(action.payload);
    },
    updateSupplier: (state, action) => {
      const index = state.suppliers.findIndex(supplier => supplier.id === action.payload.id);
      if (index !== -1) {
        state.suppliers[index] = action.payload;
      }
    },
    deleteSupplier: (state, action) => {
      state.suppliers = state.suppliers.filter(supplier => supplier.id !== action.payload);
    },
  },
});

export const { addSupplier, updateSupplier, deleteSupplier } = supplierSlice.actions;
export default supplierSlice.reducer;
