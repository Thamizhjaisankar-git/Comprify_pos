// import React, { useEffect, useState } from "react";
// import axios from "axios"; // or use fetch if you prefer
// import config from "../../config";
// import CustomToast from "../../components/globalComponent/customToast/CustomToast";

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editCategory, setEditCategory] = useState(null);
//   const [isArchiving, setIsArchiving] = useState(false);
//   const [archivingCategory, setArchivingCategory] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [toast, setToast] = useState({
//     show: false,
//     body: "",
//     status: "success",
//   });

//   const showToast = (message, status) => {
//     setToast({ show: true, body: message, status });
//   };

//   // Fetch categories on page load
//   // Get the token from localStorage or wherever it's stored
//   const token = localStorage.getItem("token"); // Adjust according to your setup

//   // Setup the Axios instance with the token for authorization
//   const axiosInstance = axios.create({
//     baseURL: config.serverApi, // Base URL for your API
//     headers: {
//       Authorization: `Bearer ${token}`, // Attach token in the Authorization header
//       "Content-Type": "application/json",
//     },
//   });

//   // Fetch categories on page load
//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoading(true);
//       try {
//         const response = await axiosInstance.get("/pos/category/store"); // Adjust URL if needed
//         console.log(response.data);
//         setCategories(response.data.categories);
//       } catch (error) {
//         console.error("Error fetching categories", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch category suggestions
//   const fetchSuggestions = async (query) => {
//     if (!query.trim()) {
//       setSuggestions([]);
//       return;
//     }
//     try {
//       const response = await axiosInstance.get(
//         `/pos/category/search?name=${query}`
//       );
//       setSuggestions(response.data.categories);
//     } catch (error) {
//       console.error("Error fetching suggestions", error);
//     }
//   };

//   // Handle input change
//   const handleInputChange = (e) => {
//     setNewCategory(e.target.value);
//     fetchSuggestions(e.target.value);
//   };

//   // Select a suggested category
//   const selectSuggestion = (categoryName) => {
//     setNewCategory(categoryName);
//     setSuggestions([]);
//   };

//   // Add new category
//   const handleAddCategory = async () => {
//     if (!newCategory.trim()) return;

//     // Check if category already exists
//     const isExisting = categories.some(
//       (category) =>
//         category.category_name.toLowerCase() === newCategory.toLowerCase()
//     );

//     if (isExisting) {
//       setNewCategory("");
//       showToast("Category already exists!", "error");
//       return;
//     }

//     setLoading(true);
//     try {
//       await axiosInstance.post("/pos/category", { category_name: newCategory }); // Adjust URL if needed
//       setNewCategory("");

//       // Refetch categories after adding
//       const response = await axiosInstance.get("/pos/category/store"); // Adjust URL if needed
//       console.log(response.data);
//       setCategories(response.data.categories);

//       showToast("Category added successfully!", "success");
//     } catch (error) {
//       console.error("Error adding category", error);
//       showToast("Internal server error! Please try again later...", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Edit category
//   const handleEditCategory = async () => {
//     if (!editCategory.category_name.trim()) return;
//     setLoading(true);
//     try {
//       await axiosInstance.put(`/pos/category/${editCategory._id}`, {
//         category_name: editCategory.category_name,
//       });
//       // Refetch categories after editing
//       const response = await axiosInstance.get("/pos/category/store"); // Adjust URL if needed
//       setCategories(response.data.categories);
//       setIsEditing(false);
//       setEditCategory(null);
//     } catch (error) {
//       console.error("Error editing category", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Archive category
//   const handleArchiveCategory = async () => {
//     if (!archivingCategory) return;
//     setIsArchiving(false);
//     setLoading(true);
//     try {
//       await axiosInstance.patch(`/categories/${archivingCategory._id}/archive`);
//       // Refetch categories after archiving
//       const response = await axiosInstance.get("/pos/category/store"); // Adjust URL if needed
//       setCategories(response.data);
//       setArchivingCategory(null);
//     } catch (error) {
//       console.error("Error archiving category", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Open edit modal
//   const openEditModal = (category) => {
//     setEditCategory({ ...category });
//     setIsEditing(true);
//   };

//   // Open archive confirmation
//   const openArchiveConfirmation = (category) => {
//     setArchivingCategory(category);
//     setIsArchiving(true);
//   };

//   return (
//     <div className="p-8 min-h-screen bg-gray-900 text-white">
//       <h1 className="text-3xl font-bold mb-6">Category Management</h1>

//       {/* Add Category */}
//       <div className="mb-6 relative w-1/3">
//         <input
//           type="text"
//           value={newCategory}
//           onChange={handleInputChange}
//           className="p-2 w-full bg-gray-800 rounded"
//           placeholder="Enter new category"
//         />
//         <button
//           onClick={handleAddCategory}
//           className="bg-blue-600 p-2 rounded mt-2"
//         >
//           Add Category
//         </button>

//         {/* Suggestions Dropdown */}
//         {suggestions.length > 0 && (
//           <ul className="absolute top-12 left-0 w-full bg-gray-700 rounded shadow-lg">
//             {suggestions.map((suggestion) => (
//               <li
//                 key={suggestion._id}
//                 onClick={() => selectSuggestion(suggestion.category_name)}
//                 className="p-2 cursor-pointer hover:bg-gray-600"
//               >
//                 {suggestion.category_name}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Loader */}
//       {loading && <div className="text-center text-lg">Loading...</div>}

//       {/* Categories Table */}
//       {!loading && categories.length > 0 && (
//         <div className="mt-6">
//           <table className="w-full border border-gray-600 text-center">
//             <thead>
//               <tr className="bg-gray-700">
//                 <th className="p-2 border border-gray-600">Category Name</th>
//                 <th className="p-2 border border-gray-600">Status</th>
//                 <th className="p-2 border border-gray-600">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categories?.map((category) => (
//                 <tr key={category._id} className="bg-gray-800">
//                   <td className="p-2 border border-gray-600">
//                     {category.category_name}
//                   </td>
//                   <td className="p-2 border border-gray-600">
//                     {category.status}
//                   </td>
//                   <td className="p-2 border border-gray-600">
//                     <button
//                       onClick={() => openEditModal(category)}
//                       className="bg-yellow-500 p-2 rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => openArchiveConfirmation(category)}
//                       className="bg-red-600 p-2 ml-2 rounded"
//                     >
//                       Archive
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Edit Modal */}
//       {isEditing && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//           <div className="bg-gray-800 p-6 rounded w-1/3">
//             <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
//             <input
//               type="text"
//               value={editCategory.category_name}
//               onChange={(e) =>
//                 setEditCategory({
//                   ...editCategory,
//                   category_name: e.target.value,
//                 })
//               }
//               className="p-2 w-full bg-gray-700 rounded"
//             />
//             <div className="mt-4 flex justify-end">
//               <button
//                 onClick={handleEditCategory}
//                 className="bg-green-600 p-2 rounded mr-2"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="bg-gray-500 p-2 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Archive Confirmation */}
//       {isArchiving && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//           <div className="bg-gray-800 p-6 rounded w-1/3">
//             <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
//             <p className="mb-4">Do you want to archive this category?</p>
//             <div className="mt-4 flex justify-end">
//               <button
//                 onClick={handleArchiveCategory}
//                 className="bg-red-600 p-2 rounded mr-2"
//               >
//                 Yes, Archive
//               </button>
//               <button
//                 onClick={() => setIsArchiving(false)}
//                 className="bg-gray-500 p-2 rounded"
//               >
//                 No, Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <CustomToast
//         show={toast.show}
//         onClose={() => setToast({ ...toast, show: false })}
//         body={toast.body}
//         status={toast.status}
//       />
//     </div>
//   );
// };

// export default Categories;
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import CustomToast from "../../components/globalComponent/customToast/CustomToast";
import { Plus, Edit, Archive, Search, Check, Loader2 } from "lucide-react";
import { useTheme } from "../../context/themeContext";
import { useViewMode } from "../../context/viewContext";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [isArchiving, setIsArchiving] = useState(false);
  const [archivingCategory, setArchivingCategory] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState({
    show: false,
    body: "",
    status: "success",
  });
  const { theme } = useTheme();
  const { viewMode, toggleViewMode } = useViewMode();

  const showToast = (message, status) => {
    setToast({ show: true, body: message, status });
  };

  // Get the token from localStorage
  const token = localStorage.getItem("token");

  // Setup the Axios instance with the token for authorization
  const axiosInstance = axios.create({
    baseURL: config.serverApi,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // Fetch categories on page load
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/pos/category/store");
        console.log(response.data);
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories", error);
        showToast("Failed to load categories", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch category suggestions
  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axiosInstance.get(
        `/pos/category/search?name=${query}`
      );
      setSuggestions(response.data.categories);
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setNewCategory(e.target.value);
    fetchSuggestions(e.target.value);
  };

  // Select a suggested category
  const selectSuggestion = (categoryName) => {
    setNewCategory(categoryName);
    setSuggestions([]);
  };

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      showToast("Category name cannot be empty", "error");
      return;
    }

    // Check if category already exists
    const isExisting = categories.some(
      (category) =>
        category.category_name.toLowerCase() === newCategory.toLowerCase()
    );

    if (isExisting) {
      setNewCategory("");
      showToast("Category already exists!", "error");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/pos/category", { category_name: newCategory });
      setNewCategory("");

      // Refetch categories after adding
      const response = await axiosInstance.get("/pos/category/store");
      setCategories(response.data.categories);

      showToast("Category added successfully!", "success");
    } catch (error) {
      console.error("Error adding category", error);
      showToast("Internal server error! Please try again later...", "error");
    } finally {
      setLoading(false);
    }
  };

  // Edit category
  const handleEditCategory = async () => {
    if (!editCategory.category_name.trim()) {
      showToast("Category name cannot be empty", "error");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.put(`/pos/category/${editCategory._id}`, {
        category_name: editCategory.category_name,
      });
      // Refetch categories after editing
      const response = await axiosInstance.get("/pos/category/store");
      setCategories(response.data.categories);
      setIsEditing(false);
      setEditCategory(null);
      showToast("Category updated successfully!", "success");
    } catch (error) {
      console.error("Error editing category", error);
      showToast("Failed to update category", "error");
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
      const response = await axiosInstance.get("/pos/category/store");
      setCategories(response.data.categories);
      setArchivingCategory(null);
      showToast("Category archived successfully!", "success");
    } catch (error) {
      console.error("Error archiving category", error);
      showToast("Failed to archive category", "error");
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

  // Filter categories based on search query
  const filteredCategories = searchQuery
    ? categories.filter((category) =>
        category.category_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;

  return (
    <div className="p-6 min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Category Management</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage your product categories
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleViewMode}
              className="p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              aria-label="Toggle view mode"
            >
              {viewMode === "grid" ? (
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                  <span className="hidden sm:inline">List View</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  <span className="hidden sm:inline">Grid View</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Add Category and Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="relative">
            <h2 className="text-lg font-semibold mb-2">Add New Category</h2>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={newCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter new category name"
                />
                {suggestions.length > 0 && (
                  <ul className="absolute z-10 mt-1 w-full bg-card rounded-md shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion._id}
                        onClick={() =>
                          selectSuggestion(suggestion.category_name)
                        }
                        className="px-4 py-2 cursor-pointer hover:bg-accent transition-colors"
                      >
                        {suggestion.category_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                onClick={handleAddCategory}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                <span>Add</span>
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Search Categories</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Search categories..."
              />
            </div>
          </div>
        </div>

        {/* Categories Display */}
        {loading && !categories.length ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading categories...</span>
          </div>
        ) : filteredCategories.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCategories.map((category) => (
                <div
                  key={category._id}
                  className="bg-card rounded-lg shadow-sm border border-border p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">
                        {category.category_name}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                          category.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {category.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(category)}
                        className="p-1.5 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
                        aria-label="Edit category"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openArchiveConfirmation(category)}
                        className="p-1.5 rounded-md bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                        aria-label="Archive category"
                      >
                        <Archive className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-3 text-left font-medium">
                      Category Name
                    </th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category, index) => (
                    <tr
                      key={category._id}
                      className={`border-t border-border hover:bg-muted/50 transition-colors ${
                        index % 2 === 0 ? "bg-background" : "bg-muted/20"
                      }`}
                    >
                      <td className="px-4 py-3">{category.category_name}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            category.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {category.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(category)}
                            className="p-1.5 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
                            aria-label="Edit category"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => openArchiveConfirmation(category)}
                            className="p-1.5 rounded-md bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                            aria-label="Archive category"
                          >
                            <Archive className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No categories found</h3>
            <p className="text-muted-foreground mt-1">
              {searchQuery
                ? "Try a different search term"
                : "Add your first category to get started"}
            </p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-card rounded-lg shadow-lg max-w-md w-full p-6 m-4">
            <h2 className="text-xl font-bold mb-4">Edit Category</h2>
            <input
              type="text"
              value={editCategory.category_name}
              onChange={(e) =>
                setEditCategory({
                  ...editCategory,
                  category_name: e.target.value,
                })
              }
              className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-md border border-input bg-background hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditCategory}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Archive Confirmation */}
      {isArchiving && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-card rounded-lg shadow-lg max-w-md w-full p-6 m-4">
            <h2 className="text-xl font-bold mb-2">Archive Category</h2>
            <p className="text-muted-foreground mb-4">
              Are you sure you want to archive the category "
              {archivingCategory.category_name}"? This action can be reversed
              later.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsArchiving(false)}
                className="px-4 py-2 rounded-md border border-input bg-background hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleArchiveCategory}
                className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Archive className="h-4 w-4" />
                )}
                Archive
              </button>
            </div>
          </div>
        </div>
      )}

      <CustomToast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        body={toast.body}
        status={toast.status}
      />
    </div>
  );
};

export default Categories;
