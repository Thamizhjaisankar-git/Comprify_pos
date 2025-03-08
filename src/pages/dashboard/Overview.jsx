import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Overview = () => {
  const stockData = [
    { name: "Electronics", stock: 300 },
    { name: "Groceries", stock: 500 },
    { name: "Clothing", stock: 200 },
  ];

  const topSellingProducts = [
    { product: "Laptop", category: "Electronics", sales: 150 },
    { product: "Rice", category: "Groceries", sales: 200 },
    { product: "Shoes", category: "Clothing", sales: 100 },
  ];

  const recentTransactions = [
    { orderId: "#1023", customer: "John Doe", amount: "$120", status: "Completed" },
    { orderId: "#1024", customer: "Jane Smith", amount: "$90", status: "Pending" },
    { orderId: "#1025", customer: "Mike Lee", amount: "$250", status: "Completed" },
  ];

  const lowStockItems = [
    { product: "Headphones", stock: 5 },
    { product: "Milk", stock: 8 },
    { product: "T-Shirts", stock: 12 },
  ];

  return (
    <div className="h-screen w-full flex flex-col p-6 text-white ">
      <div className="p-6 bg-gray-900 text-white mb-5 rounded-lg">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      </div>
      
      {/* Main Content */}
      <div className="mt-3 p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h2 className="text-lg">Total Products</h2>
            <p className="text-2xl font-bold">120</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h2 className="text-lg">Stock Available</h2>
            <p className="text-2xl font-bold">4500</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h2 className="text-lg">Suppliers</h2>
            <p className="text-2xl font-bold">15</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h2 className="text-lg">Orders Processed</h2>
            <p className="text-2xl font-bold">230</p>
          </div>
        </div>

        {/* Stock Overview Chart */}
        <div className="bg-gray-800 p-6 rounded-lg mt-6">
          <h2 className="text-xl font-bold mb-4">Stock Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip wrapperStyle={{ backgroundColor: "#333", color: "#fff" }} />
              <Bar dataKey="stock" fill="#4F46E5" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Selling Products */}
        <div className="bg-gray-800 p-6 rounded-lg mt-6">
          <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b p-2">Product</th>
                <th className="border-b p-2">Category</th>
                <th className="border-b p-2">Sales</th>
              </tr>
            </thead>
            <tbody>
              {topSellingProducts.map((item, index) => (
                <tr key={index}>
                  <td className="p-2">{item.product}</td>
                  <td className="p-2">{item.category}</td>
                  <td className="p-2">{item.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Transactions */}
        <div className="bg-gray-800 p-6 rounded-lg mt-6">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b p-2">Order ID</th>
                <th className="border-b p-2">Customer</th>
                <th className="border-b p-2">Amount</th>
                <th className="border-b p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((order, index) => (
                <tr key={index}>
                  <td className="p-2">{order.orderId}</td>
                  <td className="p-2">{order.customer}</td>
                  <td className="p-2">{order.amount}</td>
                  <td className={`p-2 ${order.status === "Completed" ? "text-green-500" : "text-yellow-500"}`}>
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-red-700 p-6 rounded-lg mt-6">
          <h2 className="text-xl font-bold mb-4">Low Stock Alerts</h2>
          <ul>
            {lowStockItems.map((item, index) => (
              <li key={index} className="p-2">{item.product} - Only {item.stock} left!</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;