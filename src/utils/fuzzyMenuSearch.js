// // src/utils/fuzzyMenuSearch.js
// import Fuse from "fuse.js";

// const pages = [
//   { name: "Overview" },
//   { name: "Create Bill" },
//   { name: "Bill List" },
//   { name: "Add Customer" },
//   { name: "Customer List" },
//   { name: "Add Product" },
//   { name: "Product List" },
//   { name: "Categories" },
//   { name: "Add Supplier" },
//   { name: "Add Employee" },
//   { name: "Employee List" },
//   { name: "Store Information" },
//   { name: "Orders Management" },
//   { name: "Order Details" },
//   { name: "Stock List" },
//   { name: "Trolly" },
// ];

// const fuse = new Fuse(pages, {
//   keys: ["name"],
//   threshold: 0.3,
// });

// export const getFuzzyMatchedMenu = (input) => {
//   const result = fuse.search(input);
//   return result.length > 0 ? result[0].item.name : null;
// };


import Fuse from "fuse.js";

const pages = [
  { name: "Overview" },
  { name: "Create Bill" },
  { name: "Bill List" },
  { name: "Add Customer" },
  { name: "Customer List" },
  { name: "Add Product" },
  { name: "Product List" },
  { name: "Categories" },
  { name: "Add Supplier" },
  { name: "Add Employee" },
  { name: "Employee List" },
  { name: "Store Information" },
  { name: "Orders Management" },
  { name: "Order Details" },
  { name: "Stock List" },
  { name: "Trolly" },
];

const fuse = new Fuse(pages, {
  keys: ["name"],
  threshold: 0.3,
});

export const getFuzzyMatches = (input, limit = 5) => {
  return fuse.search(input).slice(0, limit).map(result => result.item.name);
};
