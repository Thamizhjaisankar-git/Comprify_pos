import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  selectedCategory: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const newCategory = {
        name: action.payload,
        products: [],
      };
      state.categories.push(newCategory);
    },
    addProduct: (state, action) => {
      const { categoryName, product } = action.payload;
      const category = state.categories.find((cat) => cat.name === categoryName);
      if (category) {
        category.products.push(product);
      }
    },
    deleteProduct: (state, action) => {
      const { categoryName, productId } = action.payload;
      const category = state.categories.find((cat) => cat.name === categoryName);
      if (category) {
        category.products = category.products.filter(
          (product) => product.id !== productId
        );
      }
    },
    deleteCategory: (state, action) => {
      const categoryName = action.payload;
      state.categories = state.categories.filter(
        (category) => category.name !== categoryName
      );
      state.selectedCategory = "";
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  addCategory,
  addProduct,
  deleteProduct,
  deleteCategory,
  setSelectedCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
