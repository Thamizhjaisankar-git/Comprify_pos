// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   categories: [],
//   selectedCategory: "",
// };

// const categorySlice = createSlice({
//   name: "category",
//   initialState,
//   reducers: {
//     addCategory: (state, action) => {
//       const newCategory = {
//         name: action.payload,
//         products: [],
//       };
//       state.categories.push(newCategory);
//     },
//     addProduct: (state, action) => {
//       const { categoryName, product } = action.payload;
//       const category = state.categories.find((cat) => cat.name === categoryName);
//       if (category) {
//         category.products.push(product);
//       }
//     },


//     deleteProduct: (state, action) => {
//       const { categoryName, productId } = action.payload;
//       const category = state.categories.find((cat) => cat.name === categoryName);
//       if (category) {
//         category.products = category.products.filter(
//           (product) => product.id !== productId
//         );
//       }
//     },
//     deleteCategory: (state, action) => {
//       const categoryName = action.payload;
//       state.categories = state.categories.filter(
//         (category) => category.name !== categoryName
//       );
//       state.selectedCategory = "";
//     },
//     setSelectedCategory: (state, action) => {
//       state.selectedCategory = action.payload;
//     },
//   },
// });

// export const {
//   addCategory,
//   addProduct,
//   deleteProduct,
//   deleteCategory,
//   setSelectedCategory,
// } = categorySlice.actions;

// export default categorySlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  selectedCategory: "",
  selectedSubCategory: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const newCategory = {
        name: action.payload,
        subcategories: [], // Add subcategories array
      };
      state.categories.push(newCategory);
    },
    addSubCategory: (state, action) => {
      const { categoryName, subCategoryName } = action.payload;
      const category = state.categories.find((cat) => cat.name === categoryName);
      if (category) {
        if (!category.subcategories) category.subcategories = [];
        category.subcategories.push({
          name: subCategoryName,
          products: [],
        });
      }
    },
    addProduct: (state, action) => {
      const { categoryName, subCategoryName, product } = action.payload;
      const category = state.categories.find((cat) => cat.name === categoryName);
      if (category) {
        const subCategory = category.subcategories.find(
          (sub) => sub.name === subCategoryName
        );
        if (subCategory) {
          subCategory.products.push(product);
        }
      }
    },
    deleteProduct: (state, action) => {
      const { categoryName, subCategoryName, productId } = action.payload;
      const category = state.categories.find((cat) => cat.name === categoryName);
      if (category) {
        const subCategory = category.subcategories.find(
          (sub) => sub.name === subCategoryName
        );
        if (subCategory) {
          subCategory.products = subCategory.products.filter(
            (product) => product.id !== productId
          );
        }
      }
    },
    deleteCategory: (state, action) => {
      const categoryName = action.payload;
      state.categories = state.categories.filter(
        (category) => category.name !== categoryName
      );
      state.selectedCategory = "";
      state.selectedSubCategory = "";
    },
    deleteSubCategory: (state, action) => {
      const { categoryName, subCategoryName } = action.payload;
      const category = state.categories.find((cat) => cat.name === categoryName);
      if (category) {
        category.subcategories = category.subcategories.filter(
          (sub) => sub.name !== subCategoryName
        );
      }
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.selectedSubCategory = "";
    },
    setSelectedSubCategory: (state, action) => {
      state.selectedSubCategory = action.payload;
    },
  },
});

export const {
  addCategory,
  addSubCategory,
  addProduct,
  deleteProduct,
  deleteCategory,
  deleteSubCategory,
  setSelectedCategory,
  setSelectedSubCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
