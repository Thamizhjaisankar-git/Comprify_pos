import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/productSlice";
import config from "../../config";
import axios from "axios";
import CustomToast from "../../components/globalComponent/customToast/CustomToast";

const AddProduct = () => {
  const dispatch = useDispatch();

  // State for categories and form data
  const [categories, setCategories] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    body: "",
    status: "success",
  });
  const [product, setProduct] = useState({
    product_name: "",
    category_id: "",
    scan_id: "",
    product_weight: "",
    img_urls: [],
    description: "",
    unit: "",
    pricing: [{ mrp: "", cost_price: "", selling_price: "" }],
    // supplier_id: "",
    stock_quantity: "",
    status: "active",
  });
  const [suggestions, setSuggestions] = useState([]);

  const showToast = (message, status) => {
    setToast({ show: true, body: message, status });
    // setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  // Fetch store categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found.");
        return;
      }
      try {
        const response = await axios.get(
          `${config.serverApi}/pos/category/store`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(response.data.categories); // Set fetched categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle pricing array changes
  const handlePricingChange = (e, index) => {
    const updatedPricing = product.pricing.map((p, i) =>
      i === index ? { ...p, [e.target.name]: e.target.value } : p
    );
    setProduct({ ...product, pricing: updatedPricing });
  };

  // Handle adding/removing image URLs
  const handleImgUrlsChange = (e, index) => {
    const updatedImgUrls = [...product.img_urls];
    updatedImgUrls[index] = e.target.value;
    setProduct({ ...product, img_urls: updatedImgUrls });
  };

  const handleAddImgUrl = () => {
    setProduct({ ...product, img_urls: [...product.img_urls, ""] });
  };

  const handleRemoveImgUrl = (index) => {
    const updatedImgUrls = product.img_urls.filter((_, i) => i !== index);
    setProduct({ ...product, img_urls: updatedImgUrls });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    const formattedProduct = {
      ...product,
      product_name: product.product_name.trim().toLowerCase(),
    };

    try {
      const response = await axios.post(
        `${config.serverApi}/pos/product`,
        formattedProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Product Added:", response.data);

      // Reset form after successful submission
      setProduct({
        product_name: "",
        scan_id: "",
        category_id: "",
        product_weight: "",
        img_urls: [],
        description: "",
        unit: "",
        pricing: [{ mrp: "", cost_price: "", selling_price: "" }],
        stock_quantity: "",
        status: "active",
      });

      showToast("Product added successfully", "success");
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
      showToast("Internal server Error! please try again later...", "error");
    }
  };

  const fetchProductSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]); // Clear suggestions if input is empty
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${config.serverApi}/pos/product/search?name=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuggestions(response.data.products); // Assuming backend returns a `products` array
    } catch (error) {
      console.error("Error fetching product suggestions:", error);
    }
  };

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleProductNameChange = (e) => {
    setProduct({ ...product, product_name: e.target.value });
    debouncedFetch(e.target.value);
  };

  const debouncedFetch = debounce(fetchProductSuggestions, 300);

  return (
    <div className="p-3 bg-gray-800 text-white rounded-lg shadow-md w-full h-full overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Category Selection */}
        <div>
          <label className="block mb-1 text-sm">Category</label>
          <select
            name="category_id"
            value={product.category_id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="block mb-1 text-sm">Product Name</label>
          <input
            type="text"
            name="product_name"
            value={product.product_name}
            onChange={handleProductNameChange}
            className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
            required
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-gray-900 border border-gray-700 w-full rounded mt-1 max-h-40 overflow-y-auto">
              {suggestions.map((item) => (
                <li
                  key={item._id}
                  className="p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setProduct({ ...product, product_name: item.product_name });
                    setSuggestions([]); // Clear suggestions when selected
                  }}
                >
                  {item.product_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm">Barcode Id</label>
          <input
            type="text"
            name="scan_id"
            value={product.scan_id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Product Weight (g)</label>
          <input
            type="number"
            name="product_weight"
            value={product.product_weight}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
          ></textarea>
        </div>

        {/* Pricing Fields */}
        <div>
          <label className="block mb-1 text-sm">Pricing</label>
          {product.pricing.map((pricing, index) => (
            <div key={index} className="grid grid-cols-3 gap-2">
              <div>
                <label className="block mb-1 text-sm">MRP</label>
                <input
                  type="number"
                  name="mrp"
                  value={pricing.mrp}
                  onChange={(e) => handlePricingChange(e, index)}
                  className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Cost Price</label>
                <input
                  type="number"
                  name="cost_price"
                  value={pricing.cost_price}
                  onChange={(e) => handlePricingChange(e, index)}
                  className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Selling Price</label>
                <input
                  type="number"
                  name="selling_price"
                  value={pricing.selling_price}
                  onChange={(e) => handlePricingChange(e, index)}
                  className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Image URLs Fields */}
        <div>
          <label className="block mb-1 text-sm">Product Images</label>
          {product.img_urls.map((imgUrl, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                value={imgUrl}
                onChange={(e) => handleImgUrlsChange(e, index)}
                className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
                placeholder="Enter image URL"
              />
              <button
                type="button"
                onClick={() => handleRemoveImgUrl(index)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImgUrl}
            className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Another Image URL
          </button>
        </div>

        {/* Stock Quantity Field */}
        <div>
          <label className="block mb-1 text-sm">Stock Quantity</label>
          <input
            type="number"
            name="stock_quantity"
            value={product.stock_quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
            required
          />
        </div>

        {/* Unit Selection */}
        <div>
          <label className="block mb-1 text-sm">Unit</label>
          <select
            name="unit"
            value={product.unit}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
            required
          >
            <option value="">Select Unit</option>
            <option value="kg">Kg</option>
            <option value="liters">Liters</option>
            <option value="pcs">Pcs</option>
          </select>
        </div>

        {/* Status Selection */}
        <div>
          <label className="block mb-1 text-sm">Status</label>
          <select
            name="status"
            value={product.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-center mt-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </form>

      <CustomToast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        body={toast.body}
        status={toast.status}
      />
    </div>
  );
};

export default AddProduct;
