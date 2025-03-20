// import React, { useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addCategory,
//   addProduct,
//   deleteProduct,
//   deleteCategory,
//   setSelectedCategory,
// } from "../../redux/categorySlice";

// const CategoriesPage = () => {
//   const dispatch = useDispatch();
//   const { categories, selectedCategory } = useSelector(
//     (state) => state.category
//   );

//   const [newCategory, setNewCategory] = useState("");
//   const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productQuantity, setProductQuantity] = useState("");

//   const productNameRef = useRef();
//   const productPriceRef = useRef();
//   const productQuantityRef = useRef();

//   const handleAddCategory = () => {
//     if (!newCategory.trim()) return;
//     dispatch(addCategory(newCategory));
//     setNewCategory("");
//   };

//   const handleAddProduct = () => {
//     if (!selectedCategory || !productName || !productPrice || !productQuantity)
//       return;

//     const newProduct = {
//       id: Date.now(),
//       name: productName,
//       price: parseFloat(productPrice),
//       quantity: parseInt(productQuantity),
//     };

//     dispatch(addProduct({ categoryName: selectedCategory, product: newProduct }));

//     setProductName("");
//     setProductPrice("");
//     setProductQuantity("");
//   };

//   const handleKeyDown = (e, ref) => {
//     if (e.key === "Enter" && ref) {
//       ref.current.focus();
//     }
//   };

//   const handleDeleteProduct = (productId) => {
//     dispatch(deleteProduct({ categoryName: selectedCategory, productId }));
//   };

//   const handleDeleteCategory = (categoryName) => {
//     dispatch(deleteCategory(categoryName));
//   };

//   return (
//     <div className="p-8 min-h-screen bg-gray-900 text-white">
//       <h1 className="text-3xl font-bold mb-6">Category Management</h1>

//       {/* Add Category Section */}
//       <div className="mb-6">
//         <input
//           type="text"
//           value={newCategory}
//           onChange={(e) => setNewCategory(e.target.value)}
//           className="p-2 w-1/2 bg-gray-800 rounded"
//           placeholder="Enter new category"
//         />
//         <button
//           onClick={handleAddCategory}
//           className="bg-blue-600 p-2 ml-4 rounded"
//         >
//           Add Category
//         </button>
//       </div>

//       {/* Category Selection */}
//       <select
//         value={selectedCategory}
//         onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
//         className="p-2 w-1/4 bg-gray-800 mb-6 rounded"
//       >
//         <option value="" disabled>
//           Select Category
//         </option>
//         {categories.map((category) => (
//           <option key={category.name} value={category.name}>
//             {category.name}
//           </option>
//         ))}
//       </select>

//       {/* Add Product Section */}
//       {selectedCategory && (
//         <div className="mb-6">
//           <input
//             type="text"
//             value={productName}
//             ref={productNameRef}
//             onChange={(e) => setProductName(e.target.value)}
//             onKeyDown={(e) => handleKeyDown(e, productPriceRef)}
//             placeholder="Product Name"
//             className="p-2 bg-gray-800 rounded mr-4"
//           />
//           <input
//             type="number"
//             value={productPrice}
//             ref={productPriceRef}
//             onChange={(e) => setProductPrice(e.target.value)}
//             onKeyDown={(e) => handleKeyDown(e, productQuantityRef)}
//             placeholder="Price"
//             className="p-2 bg-gray-800 rounded mr-4"
//           />
//           <input
//             type="number"
//             value={productQuantity}
//             ref={productQuantityRef}
//             onChange={(e) => setProductQuantity(e.target.value)}
//             onKeyDown={(e) => handleKeyDown(e, null)}
//             placeholder="Quantity"
//             className="p-2 bg-gray-800 rounded"
//           />
//           <button
//             onClick={handleAddProduct}
//             className="bg-green-600 p-2 ml-4 rounded"
//           >
//             Add Product
//           </button>
//         </div>
//       )}

//       {/* Product List */}
//       {selectedCategory && (
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mb-4">
//             Products in {selectedCategory}
//           </h2>
//           <table className="w-full table-auto border-collapse border border-gray-700 text-center">
//             <thead>
//               <tr className="bg-gray-800">
//                 <th className="p-2 border">Product Name</th>
//                 <th className="p-2 border">Price</th>
//                 <th className="p-2 border">Quantity</th>
//                 <th className="p-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categories
//                 .find((category) => category.name === selectedCategory)
//                 ?.products?.map((product) => (
//                   <tr key={product.id} className="bg-gray-800">
//                     <td className="p-2 border">{product.name}</td>
//                     <td className="p-2 border">₹{product.price}</td>
//                     <td className="p-2 border">{product.quantity} pcs</td>
//                     <td className="p-2 border">
//                       <button
//                         onClick={() => handleDeleteProduct(product.id)}
//                         className="bg-red-600 p-1 rounded"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Delete Category */}
//       {selectedCategory && (
//         <button
//           onClick={() => handleDeleteCategory(selectedCategory)}
//           className="bg-red-600 p-2 rounded"
//         >
//           Delete {selectedCategory} Category
//         </button>
//       )}
//     </div>
//   );
// };

// export default CategoriesPage;



import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addSubCategory,
  addProduct,
  deleteProduct,
  deleteCategory,
  deleteSubCategory,
  setSelectedCategory,
  setSelectedSubCategory,
} from "../../redux/categorySlice";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories, selectedCategory, selectedSubCategory } = useSelector(
    (state) => state.category
  );

  const [newCategory, setNewCategory] = useState("");
  const [newSubCategory, setNewSubCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    dispatch(addCategory(newCategory));
    setNewCategory("");
  };

  const handleAddSubCategory = () => {
    if (!selectedCategory || !newSubCategory.trim()) return;
    dispatch(addSubCategory({ categoryName: selectedCategory, subCategoryName: newSubCategory }));
    setNewSubCategory("");
  };

  const handleAddProduct = () => {
    if (!selectedCategory || !selectedSubCategory || !productName || !productPrice || !productQuantity) return;

    const newProduct = {
      id: Date.now(),
      name: productName,
      price: parseFloat(productPrice),
      quantity: parseInt(productQuantity),
    };

    dispatch(addProduct({ categoryName: selectedCategory, subCategoryName: selectedSubCategory, product: newProduct }));

    setProductName("");
    setProductPrice("");
    setProductQuantity("");
  };

  const handleDeleteCategory = (categoryName) => {
    dispatch(deleteCategory(categoryName));
  };

  const handleDeleteSubCategory = (subCategoryName) => {
    dispatch(deleteSubCategory({ categoryName: selectedCategory, subCategoryName }));
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct({ categoryName: selectedCategory, subCategoryName: selectedSubCategory, productId }));
  };

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Category Management</h1>

      {/* Add Category */}
      <div className="mb-6">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="p-2 w-1/2 bg-gray-800 rounded"
          placeholder="Enter new category"
        />
        <button onClick={handleAddCategory} className="bg-blue-600 p-2 ml-4 rounded">Add Category</button>
      </div>

      {/* Select Category */}
      <div className="mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
          className="p-2 w-1/4 bg-gray-800 rounded"
        >
          <option value="" disabled>Select Category</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>{category.name}</option>
          ))}
        </select>
        {selectedCategory && (
          <button onClick={() => handleDeleteCategory(selectedCategory)} className="bg-red-600 p-2 ml-4 rounded">
            Delete Category
          </button>
        )}
      </div>

      {/* Add Subcategory */}
      {selectedCategory && (
        <div className="mb-6">
          <input
            type="text"
            value={newSubCategory}
            onChange={(e) => setNewSubCategory(e.target.value)}
            className="p-2 w-1/2 bg-gray-800 rounded"
            placeholder="Enter new subcategory"
          />
          <button onClick={handleAddSubCategory} className="bg-purple-600 p-2 ml-4 rounded">Add Subcategory</button>
        </div>
      )}

      {/* Select Subcategory */}
      {selectedCategory && (
        <div className="mb-6">
          <select
            value={selectedSubCategory}
            onChange={(e) => dispatch(setSelectedSubCategory(e.target.value))}
            className="p-2 w-1/4 bg-gray-800 rounded"
          >
            <option value="" disabled>Select Subcategory</option>
            {categories.find((c) => c.name === selectedCategory)?.subcategories?.map((sc) => (
              <option key={sc.name} value={sc.name}>{sc.name}</option>
            ))}
          </select>
          {selectedSubCategory && (
            <button onClick={() => handleDeleteSubCategory(selectedSubCategory)} className="bg-red-600 p-2 ml-4 rounded">
              Delete Subcategory
            </button>
          )}
        </div>
      )}

      {/* Add Product */}
      {selectedCategory && selectedSubCategory && (
        <div className="mb-6">
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" className="p-2 bg-gray-800 rounded mr-4" />
          <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="Price" className="p-2 bg-gray-800 rounded mr-4" />
          <input type="number" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} placeholder="Quantity" className="p-2 bg-gray-800 rounded" />
          <button onClick={handleAddProduct} className="bg-green-600 p-2 ml-4 rounded">Add Product</button>
        </div>
      )}

      {/* Show Product List */}
      {selectedCategory && selectedSubCategory && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Product List</h2>
          <table className="w-full border border-gray-600 text-center">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2 border border-gray-600">Name</th>
                <th className="p-2 border border-gray-600">Price</th>
                <th className="p-2 border border-gray-600">Quantity</th>
                <th className="p-2 border border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories
                .find((c) => c.name === selectedCategory)
                ?.subcategories.find((sc) => sc.name === selectedSubCategory)
                ?.products.map((product) => (
                  <tr key={product.id} className="bg-gray-800">
                    <td className="p-2 border border-gray-600">{product.name}</td>
                    <td className="p-2 border border-gray-600">${product.price}</td>
                    <td className="p-2 border border-gray-600">{product.quantity}</td>
                    <td className="p-2 border border-gray-600">
                      <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-600 p-2 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
