import React, { useEffect, useState } from "react";
import axios from "axios"; // or use fetch if you prefer
import config from "../../config";
import CustomToast from "../../components/globalComponent/customToast/CustomToast";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [isArchiving, setIsArchiving] = useState(false);
  const [archivingCategory, setArchivingCategory] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    body: "",
    status: "success",
  });

  const showToast = (message, status) => {
    setToast({ show: true, body: message, status });
  };

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
    if (!newCategory.trim()) return;

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
      await axiosInstance.post("/pos/category", { category_name: newCategory }); // Adjust URL if needed
      setNewCategory("");

      // Refetch categories after adding
      const response = await axiosInstance.get("/pos/category/store"); // Adjust URL if needed
      console.log(response.data);
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
      <div className="mb-6 relative w-1/3">
        <input
          type="text"
          value={newCategory}
          onChange={handleInputChange}
          className="p-2 w-full bg-gray-800 rounded"
          placeholder="Enter new category"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 p-2 rounded mt-2"
        >
          Add Category
        </button>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute top-12 left-0 w-full bg-gray-700 rounded shadow-lg">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion._id}
                onClick={() => selectSuggestion(suggestion.category_name)}
                className="p-2 cursor-pointer hover:bg-gray-600"
              >
                {suggestion.category_name}
              </li>
            ))}
          </ul>
        )}
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
