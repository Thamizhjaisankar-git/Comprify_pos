import React, { useState } from "react";

const StockList = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [products, setProducts] = useState([
    { id: 1, name: "Oreo", category: "Biscuits", price: 30, stock: 20, newStock: "" },
    { id: 2, name: "Hide & Seek", category: "Biscuits", price: 50, stock: 15, newStock: "" },
    { id: 3, name: "Basmati Rice", category: "Rice", price: 200, stock: 30, newStock: "" },
    { id: 4, name: "Ponni Rice", category: "Rice", price: 150, stock: 25, newStock: "" },
    { id: 5, name: "Tata Salt", category: "Salt", price: 20, stock: 40, newStock: "" },
  ]);

  // Extract unique categories
  const categories = ["All Categories", ...new Set(products.map((p) => p.category))];

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false); // Close dropdown after selection
  };

  // Handle new stock input (stores only the new stock, does not update current stock)
  const handleStockChange = (id, value) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, newStock: value } : item
      )
    );
  };

  // Update the current stock when the button is clicked
  const updateStockValues = () => {
    setProducts((prev) =>
      prev.map((item) => ({
        ...item,
        stock: item.newStock ? parseInt(item.newStock) : item.stock, // Only update if newStock is provided
        newStock: "", // Reset new stock input after update
      }))
    );
  };

  // Filter products based on search and selected category
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All Categories" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Stock List</h1>

      {/* Search Field */}
      <input
        type="text"
        placeholder="Search Products..."
        className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Dropdown */}
      <div 
        className="relative w-64 mb-4 cursor-pointer"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <div className="p-2 bg-gray-700 rounded flex justify-between items-center">
          <span>{selectedCategory}</span>
          <span className="ml-2">▼</span>
        </div>

        {showDropdown && (
          <div className="absolute left-0 w-full bg-gray-800 mt-1 rounded shadow-lg z-10">
            {categories.map((category) => (
              <div 
                key={category} 
                className="p-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stock Table */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        {filteredProducts.length > 0 ? (
          <table className="w-full border-collapse text-center">
            <thead>
            <tr className="border-b border-gray-700">
      <th className="p-2 border border-gray-700">Product Name</th>
      <th className="p-2 border border-gray-700">Price</th>
      <th className="p-2 border border-gray-700">Current Stock</th>
      <th className="p-2 border border-gray-700">New Stock</th>
    </tr>
  </thead>
  <tbody>
    {filteredProducts.map((product) => (
      <tr key={product.id} className="border-b border-gray-700">
        <td className="p-2 border border-gray-700">{product.name}</td>
        <td className="p-2 border border-gray-700">₹{product.price}</td>
        <td className="p-2 border border-gray-700">{product.stock}</td>
        <td className="p-2 border border-gray-700">
                    <input
                      type="number"
                      className="w-20 p-1 rounded bg-gray-700 text-white"
                      value={product.newStock}
                      onChange={(e) => handleStockChange(product.id, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>

      {/* Update Stocks Button */}
      <div className="mt-4">
        <button 
          className="bg-blue-600 px-4 py-2 rounded text-white font-semibold hover:bg-blue-700 transition"
          onClick={updateStockValues}
        >
          Update Stocks
        </button>
      </div>
    </div>
  );
};

export default StockList;
