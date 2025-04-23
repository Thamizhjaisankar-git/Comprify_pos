// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import config from "../../config";
// import CustomToast from "../../components/globalComponent/customToast/CustomToast";

// const StockList = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const storeId = localStorage.getItem("storeId"); // Assume storeId is stored in local storage

//   const [toast, setToast] = useState({
//     show: false,
//     body: "",
//     status: "success",
//   });

//   const showToast = (message, status) => {
//     setToast({ show: true, body: message, status });
//   };

//   useEffect(() => {
//     fetchStock();
//   }, []);

//   const fetchStock = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("Authentication token not found.");

//       const response = await axios.get(
//         `${config.serverApi}/pos/product/store/stock`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       console.log(response.data);
//       const formattedProducts = response.data.stockData.map((stock) => ({
//         product_id: stock.product_id,
//         product_code: stock.product_code,
//         name: stock.product_name,
//         stock: stock.stock_quantity,
//         newStock: "",
//       }));

//       setProducts(formattedProducts);
//       setFilteredProducts(formattedProducts);
//     } catch (err) {
//       setError(err.message || "Failed to fetch stock data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle search input
//   const handleSearchChange = (value) => {
//     setSearch(value);
//     filterProducts(value);
//   };

//   // Handle filtering
//   const filterProducts = (searchText) => {
//     const filtered = products.filter((p) => {
//       const matchesSearch = p.name
//         .toLowerCase()
//         .includes(searchText.toLowerCase());
//       return matchesSearch;
//     });
//     setFilteredProducts(filtered);
//   };

//   // Handle stock input change
//   const handleStockChange = (id, value) => {
//     setFilteredProducts((prev) =>
//       prev.map((item) => {
//         console.log(item, id);
//         return item.product_id === id ? { ...item, newStock: value } : item;
//       })
//     );
//   };

//   // Update stock in bulk
//   const updateStockValues = async () => {
//     const stockUpdates = filteredProducts
//       .filter((p) => p.newStock !== "")
//       .map((p) => ({
//         product_id: p.product_id,
//         stock_quantity: parseInt(p.newStock),
//       }));

//     if (stockUpdates.length === 0) return alert("No changes made.");

//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${config.serverApi}/pos/product/store/stock`,
//         { storeId, stockUpdates },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       showToast("Stock updated Successfully!", "success");
//       fetchStock(); // Refresh stock data
//     } catch (err) {
//       showToast("Internal Server Error! please try again later...", "error");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-900 text-white min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">Stock Management</h1>

//       {/* Search Input */}
//       <input
//         type="text"
//         placeholder="Search Products..."
//         className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
//         value={search}
//         onChange={(e) => handleSearchChange(e.target.value)}
//       />

//       {/* Stock Table */}
//       {loading ? (
//         <p className="text-gray-300">Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <div className="bg-gray-800 p-4 rounded-lg shadow-md">
//           {filteredProducts.length > 0 ? (
//             <table className="w-full border-collapse text-center">
//               <thead>
//                 <tr className="border-b border-gray-700">
//                   <th className="p-2 border border-gray-700">Product Code</th>
//                   <th className="p-2 border border-gray-700">Product Name</th>
//                   <th className="p-2 border border-gray-700">Current Stock</th>
//                   <th className="p-2 border border-gray-700">New Stock</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProducts.map((product) => (
//                   <tr
//                     key={product.product_id}
//                     className="border-b border-gray-700"
//                   >
//                     <td className="p-2 border border-gray-700">
//                       {product.product_code}
//                     </td>
//                     <td className="p-2 border border-gray-700">
//                       {product.name}
//                     </td>

//                     <td className="p-2 border border-gray-700">
//                       {product.stock}
//                     </td>
//                     <td className="p-2 border border-gray-700">
//                       <input
//                         type="number"
//                         className="w-20 p-1 rounded bg-gray-700 text-white"
//                         value={product.newStock}
//                         onChange={(e) =>
//                           handleStockChange(product.product_id, e.target.value)
//                         }
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p className="text-center">No products found.</p>
//           )}
//         </div>
//       )}

//       {/* Update Stock Button */}
//       <div className="mt-4">
//         <button
//           className="bg-blue-600 px-4 py-2 rounded text-white font-semibold hover:bg-blue-700 transition"
//           onClick={updateStockValues}
//         >
//           Update Stocks
//         </button>
//       </div>

//       <CustomToast
//         show={toast.show}
//         onClose={() => setToast({ ...toast, show: false })}
//         body={toast.body}
//         status={toast.status}
//       />
//     </div>
//   );
// };

// export default StockList;
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import CustomToast from "../../components/globalComponent/customToast/CustomToast";
import {
  Search,
  Filter,
  Package,
  Save,
  ArrowUpDown,
  Plus,
  Minus,
} from "lucide-react";
import { useViewMode } from "../../context/viewContext";
import { useTheme } from "../../context/themeContext";

const StockList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const storeId = localStorage.getItem("storeId"); // Assume storeId is stored in local storage
  const { viewMode, toggleViewMode } = useViewMode();
  const { theme } = useTheme();
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

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
      const matchesSearch =
        p.name.toLowerCase().includes(searchText.toLowerCase()) ||
        p.product_code.toLowerCase().includes(searchText.toLowerCase());
      return matchesSearch;
    });
    setFilteredProducts(filtered);
  };

  // Handle stock input change
  const handleStockChange = (id, value) => {
    setFilteredProducts((prev) =>
      prev.map((item) => {
        return item.product_id === id ? { ...item, newStock: value } : item;
      })
    );
  };

  // Handle increment/decrement stock
  const handleAdjustStock = (id, amount) => {
    setFilteredProducts((prev) =>
      prev.map((item) => {
        if (item.product_id === id) {
          const currentValue =
            item.newStock === "" ? item.stock : Number.parseInt(item.newStock);
          const newValue = Math.max(0, currentValue + amount);
          return { ...item, newStock: newValue.toString() };
        }
        return item;
      })
    );
  };

  // Update stock in bulk
  const updateStockValues = async () => {
    const stockUpdates = filteredProducts
      .filter((p) => p.newStock !== "")
      .map((p) => ({
        product_id: p.product_id,
        stock_quantity: Number.parseInt(p.newStock),
      }));

    if (stockUpdates.length === 0) {
      showToast("No changes made.", "info");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${config.serverApi}/pos/product/store/stock`,
        { storeId, stockUpdates },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showToast("Stock updated successfully!", "success");
      fetchStock(); // Refresh stock data
    } catch (err) {
      showToast("Failed to update stock. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Stock Management</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="input-modern pl-10 pr-4 py-2 w-full md:w-64"
            />
          </div>

          {/* View Toggle */}
          <button
            onClick={toggleViewMode}
            className="btn-modern-outline flex items-center gap-2"
          >
            {viewMode === "grid" ? (
              <>
                <Filter size={18} />
                <span>List View</span>
              </>
            ) : (
              <>
                <Filter size={18} />
                <span>Grid View</span>
              </>
            )}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p>{error}</p>
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="bg-card rounded-xl shadow p-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                  <Package size={32} className="text-muted-foreground" />
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2">No Products Found</h2>
              <p className="text-muted-foreground">
                There are no products matching your search criteria.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid-view">
              {filteredProducts.map((product) => (
                <div key={product.product_id} className="modern-card">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Code: {product.product_code}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold mb-4">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">
                        Current Stock:
                      </span>
                      <span className="font-semibold">{product.stock}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <button
                        onClick={() =>
                          handleAdjustStock(product.product_id, -1)
                        }
                        className="p-1 rounded-md bg-muted hover:bg-muted/80"
                      >
                        <Minus size={16} />
                      </button>

                      <input
                        type="number"
                        value={product.newStock}
                        onChange={(e) =>
                          handleStockChange(product.product_id, e.target.value)
                        }
                        placeholder="New stock"
                        className="input-modern text-center"
                      />

                      <button
                        onClick={() => handleAdjustStock(product.product_id, 1)}
                        className="p-1 rounded-md bg-muted hover:bg-muted/80"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {product.newStock !== "" && (
                      <div className="text-sm text-center mb-4">
                        <span
                          className={
                            product.newStock > product.stock
                              ? "text-green-500"
                              : product.newStock < product.stock
                              ? "text-red-500"
                              : "text-muted-foreground"
                          }
                        >
                          {product.newStock > product.stock
                            ? `+${product.newStock - product.stock} items`
                            : product.newStock < product.stock
                            ? `-${product.stock - product.newStock} items`
                            : "No change"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table-modern">
                  <thead>
                    <tr>
                      <th
                        onClick={() => requestSort("product_code")}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-1">
                          Product Code
                          <ArrowUpDown size={14} />
                        </div>
                      </th>
                      <th
                        onClick={() => requestSort("name")}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-1">
                          Product Name
                          <ArrowUpDown size={14} />
                        </div>
                      </th>
                      <th
                        onClick={() => requestSort("stock")}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-1">
                          Current Stock
                          <ArrowUpDown size={14} />
                        </div>
                      </th>
                      <th>New Stock</th>
                      <th>Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.product_id}>
                        <td>{product.product_code}</td>
                        <td>{product.name}</td>
                        <td>{product.stock}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleAdjustStock(product.product_id, -1)
                              }
                              className="p-1 rounded-md bg-muted hover:bg-muted/80"
                            >
                              <Minus size={14} />
                            </button>

                            <input
                              type="number"
                              value={product.newStock}
                              onChange={(e) =>
                                handleStockChange(
                                  product.product_id,
                                  e.target.value
                                )
                              }
                              placeholder="New stock"
                              className="input-modern w-20 text-center py-1"
                            />

                            <button
                              onClick={() =>
                                handleAdjustStock(product.product_id, 1)
                              }
                              className="p-1 rounded-md bg-muted hover:bg-muted/80"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td>
                          {product.newStock !== "" && (
                            <span
                              className={
                                product.newStock > product.stock
                                  ? "text-green-500"
                                  : product.newStock < product.stock
                                  ? "text-red-500"
                                  : "text-muted-foreground"
                              }
                            >
                              {product.newStock > product.stock
                                ? `+${product.newStock - product.stock}`
                                : product.newStock < product.stock
                                ? `-${product.stock - product.newStock}`
                                : "No change"}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Update Stock Button */}
          <div className="mt-6 flex justify-end">
            <button
              className="btn-modern flex items-center gap-2"
              onClick={updateStockValues}
              disabled={saving}
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Update Stocks
                </>
              )}
            </button>
          </div>
        </>
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

export default StockList;
