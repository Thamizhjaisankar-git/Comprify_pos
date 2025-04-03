import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import CustomToast from "../../components/globalComponent/customToast/CustomToast";

const StockList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storeId = localStorage.getItem("storeId"); // Assume storeId is stored in local storage

  const [toast, setToast] = useState({
    show: false,
    body: "",
    status: "success",
  });

  const showToast = (message, status) => {
    setToast({ show: true, body: message, status });
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found.");

      const response = await axios.get(
        `${config.serverApi}/pos/product/store/stock`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response.data);
      const formattedProducts = response.data.stockData.map((stock) => ({
        product_id: stock.product_id,
        product_code: stock.product_code,
        name: stock.product_name,
        stock: stock.stock_quantity,
        newStock: "",
      }));

      setProducts(formattedProducts);
      setFilteredProducts(formattedProducts);
    } catch (err) {
      setError(err.message || "Failed to fetch stock data.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search input
  const handleSearchChange = (value) => {
    setSearch(value);
    filterProducts(value);
  };

  // Handle filtering
  const filterProducts = (searchText) => {
    const filtered = products.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return matchesSearch;
    });
    setFilteredProducts(filtered);
  };

  // Handle stock input change
  const handleStockChange = (id, value) => {
    setFilteredProducts((prev) =>
      prev.map((item) => {
        console.log(item, id);
        return item.product_id === id ? { ...item, newStock: value } : item;
      })
    );
  };

  // Update stock in bulk
  const updateStockValues = async () => {
    const stockUpdates = filteredProducts
      .filter((p) => p.newStock !== "")
      .map((p) => ({
        product_id: p.product_id,
        stock_quantity: parseInt(p.newStock),
      }));

    if (stockUpdates.length === 0) return alert("No changes made.");

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${config.serverApi}/pos/product/store/stock`,
        { storeId, stockUpdates },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showToast("Stock updated Successfully!", "success");
      fetchStock(); // Refresh stock data
    } catch (err) {
      showToast("Internal Server Error! please try again later...", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Stock Management</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Products..."
        className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
      />

      {/* Stock Table */}
      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          {filteredProducts.length > 0 ? (
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-2 border border-gray-700">Product Code</th>
                  <th className="p-2 border border-gray-700">Product Name</th>
                  <th className="p-2 border border-gray-700">Current Stock</th>
                  <th className="p-2 border border-gray-700">New Stock</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.product_id}
                    className="border-b border-gray-700"
                  >
                    <td className="p-2 border border-gray-700">
                      {product.product_code}
                    </td>
                    <td className="p-2 border border-gray-700">
                      {product.name}
                    </td>

                    <td className="p-2 border border-gray-700">
                      {product.stock}
                    </td>
                    <td className="p-2 border border-gray-700">
                      <input
                        type="number"
                        className="w-20 p-1 rounded bg-gray-700 text-white"
                        value={product.newStock}
                        onChange={(e) =>
                          handleStockChange(product.product_id, e.target.value)
                        }
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
      )}

      {/* Update Stock Button */}
      <div className="mt-4">
        <button
          className="bg-blue-600 px-4 py-2 rounded text-white font-semibold hover:bg-blue-700 transition"
          onClick={updateStockValues}
        >
          Update Stocks
        </button>
      </div>

      <CustomToast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        body={toast.body}
        status={toast.status}
      />
    </div>
  );
};

export default StockList;
