// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addCategory,
//   addSubCategory,
//   addProduct,
//   deleteProduct,
//   deleteCategory,
//   deleteSubCategory,
//   setSelectedCategory,
//   setSelectedSubCategory,
// } from "../../redux/categorySlice";

// const CategoriesPage = () => {
//   const dispatch = useDispatch();
//   const { categories, selectedCategory, selectedSubCategory } = useSelector(
//     (state) => state.category
//   );

//   const [newCategory, setNewCategory] = useState("");
//   const [newSubCategory, setNewSubCategory] = useState("");
//   const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productQuantity, setProductQuantity] = useState("");

//   const handleAddCategory = () => {
//     if (!newCategory.trim()) return;
//     dispatch(addCategory(newCategory));
//     setNewCategory("");
//   };

//   const handleAddSubCategory = () => {
//     if (!selectedCategory || !newSubCategory.trim()) return;
//     dispatch(
//       addSubCategory({
//         categoryName: selectedCategory,
//         subCategoryName: newSubCategory,
//       })
//     );
//     setNewSubCategory("");
//   };

//   const handleAddProduct = () => {
//     if (
//       !selectedCategory ||
//       !selectedSubCategory ||
//       !productName ||
//       !productPrice ||
//       !productQuantity
//     )
//       return;

//     const newProduct = {
//       id: Date.now(),
//       name: productName,
//       price: parseFloat(productPrice),
//       quantity: parseInt(productQuantity),
//     };

//     dispatch(
//       addProduct({
//         categoryName: selectedCategory,
//         subCategoryName: selectedSubCategory,
//         product: newProduct,
//       })
//     );

//     setProductName("");
//     setProductPrice("");
//     setProductQuantity("");
//   };

//   const handleDeleteCategory = (categoryName) => {
//     dispatch(deleteCategory(categoryName));
//   };

//   const handleDeleteSubCategory = (subCategoryName) => {
//     dispatch(
//       deleteSubCategory({ categoryName: selectedCategory, subCategoryName })
//     );
//   };

//   const handleDeleteProduct = (productId) => {
//     dispatch(
//       deleteProduct({
//         categoryName: selectedCategory,
//         subCategoryName: selectedSubCategory,
//         productId,
//       })
//     );
//   };

//   return (
//     <div className="p-8 min-h-screen bg-gray-900 text-white">
//       <h1 className="text-3xl font-bold mb-6">Category Management</h1>

//       {/* Add Category */}
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

//       {/* Select Category */}
//       <div className="mb-6">
//         <select
//           value={selectedCategory}
//           onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
//           className="p-2 w-1/4 bg-gray-800 rounded"
//         >
//           <option value="" disabled>
//             Select Category
//           </option>
//           {categories.map((category) => (
//             <option key={category.name} value={category.name}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//         {selectedCategory && (
//           <button
//             onClick={() => handleDeleteCategory(selectedCategory)}
//             className="bg-red-600 p-2 ml-4 rounded"
//           >
//             Delete Category
//           </button>
//         )}
//       </div>

//       {/* Add Subcategory */}
//       {selectedCategory && (
//         <div className="mb-6">
//           <input
//             type="text"
//             value={newSubCategory}
//             onChange={(e) => setNewSubCategory(e.target.value)}
//             className="p-2 w-1/2 bg-gray-800 rounded"
//             placeholder="Enter new subcategory"
//           />
//           <button
//             onClick={handleAddSubCategory}
//             className="bg-purple-600 p-2 ml-4 rounded"
//           >
//             Add Subcategory
//           </button>
//         </div>
//       )}

//       {/* Select Subcategory */}
//       {selectedCategory && (
//         <div className="mb-6">
//           <select
//             value={selectedSubCategory}
//             onChange={(e) => dispatch(setSelectedSubCategory(e.target.value))}
//             className="p-2 w-1/4 bg-gray-800 rounded"
//           >
//             <option value="" disabled>
//               Select Subcategory
//             </option>
//             {categories
//               .find((c) => c.name === selectedCategory)
//               ?.subcategories?.map((sc) => (
//                 <option key={sc.name} value={sc.name}>
//                   {sc.name}
//                 </option>
//               ))}
//           </select>
//           {selectedSubCategory && (
//             <button
//               onClick={() => handleDeleteSubCategory(selectedSubCategory)}
//               className="bg-red-600 p-2 ml-4 rounded"
//             >
//               Delete Subcategory
//             </button>
//           )}
//         </div>
//       )}

//       {/* Add Product */}
//       {selectedCategory && selectedSubCategory && (
//         <div className="mb-6">
//           <input
//             type="text"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//             placeholder="Product Name"
//             className="p-2 bg-gray-800 rounded mr-4"
//           />
//           <input
//             type="number"
//             value={productPrice}
//             onChange={(e) => setProductPrice(e.target.value)}
//             placeholder="Price"
//             className="p-2 bg-gray-800 rounded mr-4"
//           />
//           <input
//             type="number"
//             value={productQuantity}
//             onChange={(e) => setProductQuantity(e.target.value)}
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

//       {/* Show Product List */}
//       {selectedCategory && selectedSubCategory && (
//         <div className="mt-6">
//           <h2 className="text-2xl font-bold mb-4">Product List</h2>
//           <table className="w-full border border-gray-600 text-center">
//             <thead>
//               <tr className="bg-gray-700">
//                 <th className="p-2 border border-gray-600">Name</th>
//                 <th className="p-2 border border-gray-600">Price</th>
//                 <th className="p-2 border border-gray-600">Quantity</th>
//                 <th className="p-2 border border-gray-600">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categories
//                 .find((c) => c.name === selectedCategory)
//                 ?.subcategories.find((sc) => sc.name === selectedSubCategory)
//                 ?.products.map((product) => (
//                   <tr key={product.id} className="bg-gray-800">
//                     <td className="p-2 border border-gray-600">
//                       {product.name}
//                     </td>
//                     <td className="p-2 border border-gray-600">
//                       ${product.price}
//                     </td>
//                     <td className="p-2 border border-gray-600">
//                       {product.quantity}
//                     </td>
//                     <td className="p-2 border border-gray-600">
//                       <button
//                         onClick={() => handleDeleteProduct(product.id)}
//                         className="bg-red-600 p-2 rounded"
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
//     </div>
//   );
// };

// export default CategoriesPage;
import React, { useEffect, useState } from "react";
import axios from "axios"; // or use fetch if you prefer
import config from "../../config";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [isArchiving, setIsArchiving] = useState(false);
  const [archivingCategory, setArchivingCategory] = useState(null);

  // Fetch categories on page load
  // Get the token from localStorage or wherever it's stored
  const token = localStorage.getItem("token"); // Adjust according to your setup

  // Setup the Axios instance with the token for authorization
  const axiosInstance = axios.create({
    baseURL: config.serverApi, // Base URL for your API
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in the Authorization header
      "Content-Type": "application/json",
    },
  });

  // Fetch categories on page load
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/pos/category/store"); // Adjust URL if needed
        console.log(response.data);
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    setLoading(true);
    try {
      await axiosInstance.post("/pos/category", { category_name: newCategory }); // Adjust URL if needed
      setNewCategory("");
      // Refetch categories after adding
      const response = await axiosInstance.get("/pos/category/store"); // Adjust URL if needed
      setCategories(response.data);
    } catch (error) {
      console.error("Error adding category", error);
    } finally {
      setLoading(false);
    }
  };

  // Edit category
  const handleEditCategory = async () => {
    if (!editCategory.category_name.trim()) return;
    setLoading(true);
    try {
      await axiosInstance.put(`/pos/category/${editCategory._id}`, {
        category_name: editCategory.category_name,
      });
      // Refetch categories after editing
      const response = await axiosInstance.get("/pos/category/store"); // Adjust URL if needed
      setCategories(response.data.categories);
      setIsEditing(false);
      setEditCategory(null);
    } catch (error) {
      console.error("Error editing category", error);
    } finally {
      setLoading(false);
    }
  };

  // Archive category
  const handleArchiveCategory = async () => {
    if (!archivingCategory) return;
    setIsArchiving(false);
    setLoading(true);
    try {
      await axiosInstance.patch(`/categories/${archivingCategory._id}/archive`);
      // Refetch categories after archiving
      const response = await axiosInstance.get("/pos/category/store"); // Adjust URL if needed
      setCategories(response.data);
      setArchivingCategory(null);
    } catch (error) {
      console.error("Error archiving category", error);
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal
  const openEditModal = (category) => {
    setEditCategory({ ...category });
    setIsEditing(true);
  };

  // Open archive confirmation
  const openArchiveConfirmation = (category) => {
    setArchivingCategory(category);
    setIsArchiving(true);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Category Management</h1>

      {/* Add Category */}
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="p-2 w-1/3 bg-gray-800 rounded"
          placeholder="Enter new category"
        />
        <button onClick={handleAddCategory} className="bg-blue-600 p-2 rounded">
          Add Category
        </button>
      </div>

      {/* Loader */}
      {loading && <div className="text-center text-lg">Loading...</div>}

      {/* Categories Table */}
      {!loading && categories.length > 0 && (
        <div className="mt-6">
          <table className="w-full border border-gray-600 text-center">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2 border border-gray-600">Category Name</th>
                <th className="p-2 border border-gray-600">Status</th>
                <th className="p-2 border border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr key={category._id} className="bg-gray-800">
                  <td className="p-2 border border-gray-600">
                    {category.category_name}
                  </td>
                  <td className="p-2 border border-gray-600">
                    {category.status}
                  </td>
                  <td className="p-2 border border-gray-600">
                    <button
                      onClick={() => openEditModal(category)}
                      className="bg-yellow-500 p-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openArchiveConfirmation(category)}
                      className="bg-red-600 p-2 ml-2 rounded"
                    >
                      Archive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded w-1/3">
            <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
            <input
              type="text"
              value={editCategory.category_name}
              onChange={(e) =>
                setEditCategory({
                  ...editCategory,
                  category_name: e.target.value,
                })
              }
              className="p-2 w-full bg-gray-700 rounded"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleEditCategory}
                className="bg-green-600 p-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Archive Confirmation */}
      {isArchiving && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded w-1/3">
            <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
            <p className="mb-4">Do you want to archive this category?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleArchiveCategory}
                className="bg-red-600 p-2 rounded mr-2"
              >
                Yes, Archive
              </button>
              <button
                onClick={() => setIsArchiving(false)}
                className="bg-gray-500 p-2 rounded"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
