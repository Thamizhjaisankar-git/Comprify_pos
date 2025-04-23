// import React, { use, useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { useSocket, useSocketListener } from "../../context/socketContext.jsx";

// const Overview = () => {
//   const stockData = [
//     { name: "Electronics", stock: 300 },
//     { name: "Groceries", stock: 500 },
//     { name: "Clothing", stock: 200 },
//   ];

//   const topSellingProducts = [
//     { product: "Laptop", category: "Electronics", sales: 150 },
//     { product: "Rice", category: "Groceries", sales: 200 },
//     { product: "Shoes", category: "Clothing", sales: 100 },
//   ];

//   const recentTransactions = [
//     {
//       orderId: "#1023",
//       customer: "John Doe",
//       amount: "$120",
//       status: "Completed",
//     },
//     {
//       orderId: "#1024",
//       customer: "Jane Smith",
//       amount: "$90",
//       status: "Pending",
//     },
//     {
//       orderId: "#1025",
//       customer: "Mike Lee",
//       amount: "$250",
//       status: "Completed",
//     },
//   ];

//   const lowStockItems = [
//     { product: "Headphones", stock: 5 },
//     { product: "Milk", stock: 8 },
//     { product: "T-Shirts", stock: 12 },
//   ];

//   const [num, setNum] = useState(0);
//   const { connectionStatus } = useSocket();

//   useSocketListener(
//     "add",
//     (update) => {
//       console.log(connectionStatus);
//       console.log("------------", update);
//       setNum((prev) => prev + update.num);
//     },
//     [num]
//   );

//   return (
//     <div className="h-screen w-full flex flex-col p-6 text-white ">
//       <div className="p-6 bg-gray-900 text-white mb-5 rounded-lg">
//         <h1 className="text-3xl font-bold">Dashboard Overview {num}</h1>
//       </div>

//       {/* Main Content */}
//       <div className="mt-3 p-6">
//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <div className="bg-gray-800 p-6 rounded-lg text-center">
//             <h2 className="text-lg">Total Products</h2>
//             <p className="text-2xl font-bold">120</p>
//           </div>
//           <div className="bg-gray-800 p-6 rounded-lg text-center">
//             <h2 className="text-lg">Stock Available</h2>
//             <p className="text-2xl font-bold">4500</p>
//           </div>
//           <div className="bg-gray-800 p-6 rounded-lg text-center">
//             <h2 className="text-lg">Suppliers</h2>
//             <p className="text-2xl font-bold">15</p>
//           </div>
//           <div className="bg-gray-800 p-6 rounded-lg text-center">
//             <h2 className="text-lg">Orders Processed</h2>
//             <p className="text-2xl font-bold">230</p>
//           </div>
//         </div>

//         {/* Stock Overview Chart */}
//         <div className="bg-gray-800 p-6 rounded-lg mt-6">
//           <h2 className="text-xl font-bold mb-4">Stock Overview</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart
//               data={stockData}
//               margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
//             >
//               <XAxis dataKey="name" stroke="#fff" />
//               <YAxis stroke="#fff" />
//               <Tooltip
//                 wrapperStyle={{ backgroundColor: "#333", color: "#fff" }}
//               />
//               <Bar dataKey="stock" fill="#4F46E5" barSize={50} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Top Selling Products */}
//         <div className="bg-gray-800 p-6 rounded-lg mt-6">
//           <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
//           <table className="w-full text-left">
//             <thead>
//               <tr>
//                 <th className="border-b p-2">Product</th>
//                 <th className="border-b p-2">Category</th>
//                 <th className="border-b p-2">Sales</th>
//               </tr>
//             </thead>
//             <tbody>
//               {topSellingProducts.map((item, index) => (
//                 <tr key={index}>
//                   <td className="p-2">{item.product}</td>
//                   <td className="p-2">{item.category}</td>
//                   <td className="p-2">{item.sales}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Recent Transactions */}
//         <div className="bg-gray-800 p-6 rounded-lg mt-6">
//           <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
//           <table className="w-full text-left">
//             <thead>
//               <tr>
//                 <th className="border-b p-2">Order ID</th>
//                 <th className="border-b p-2">Customer</th>
//                 <th className="border-b p-2">Amount</th>
//                 <th className="border-b p-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentTransactions.map((order, index) => (
//                 <tr key={index}>
//                   <td className="p-2">{order.orderId}</td>
//                   <td className="p-2">{order.customer}</td>
//                   <td className="p-2">{order.amount}</td>
//                   <td
//                     className={`p-2 ${
//                       order.status === "Completed"
//                         ? "text-green-500"
//                         : "text-yellow-500"
//                     }`}
//                   >
//                     {order.status}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Low Stock Alerts */}
//         <div className="bg-red-700 p-6 rounded-lg mt-6">
//           <h2 className="text-xl font-bold mb-4">Low Stock Alerts</h2>
//           <ul>
//             {lowStockItems.map((item, index) => (
//               <li key={index} className="p-2">
//                 {item.product} - Only {item.stock} left!
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Overview;
"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useSocket, useSocketListener } from "../../context/socketContext.jsx";
import { useTheme } from "../../context/themeContext";
import {
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

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
    {
      orderId: "#1023",
      customer: "John Doe",
      amount: "$120",
      status: "Completed",
    },
    {
      orderId: "#1024",
      customer: "Jane Smith",
      amount: "$90",
      status: "Pending",
    },
    {
      orderId: "#1025",
      customer: "Mike Lee",
      amount: "$250",
      status: "Completed",
    },
  ];

  const lowStockItems = [
    { product: "Headphones", stock: 5 },
    { product: "Milk", stock: 8 },
    { product: "T-Shirts", stock: 12 },
  ];

  const [num, setNum] = useState(0);
  const { connectionStatus } = useSocket();
  const { theme } = useTheme();

  useSocketListener(
    "add",
    (update) => {
      console.log(connectionStatus);
      console.log("------------", update);
      setNum((prev) => prev + update.num);
    },
    [num]
  );

  // Sales data for pie chart
  const salesData = [
    { name: "Electronics", value: 4000 },
    { name: "Groceries", value: 3000 },
    { name: "Clothing", value: 2000 },
    { name: "Home", value: 1500 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-6 bg-card rounded-xl shadow-sm mb-6">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Summary Cards */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex items-center">
          <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
            <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Products
            </p>
            <p className="text-2xl font-bold">120</p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex items-center">
          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4">
            <ShoppingCart className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Stock Available
            </p>
            <p className="text-2xl font-bold">4,500</p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex items-center">
          <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4">
            <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Customers
            </p>
            <p className="text-2xl font-bold">15</p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex items-center">
          <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-4">
            <DollarSign className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Revenue</p>
            <p className="text-2xl font-bold">₹23,500</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Stock Overview Chart */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Stock Overview</h2>
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              Last 30 days
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={stockData}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: theme === "light" ? "#e5e7eb" : "#374151" }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: theme === "light" ? "#e5e7eb" : "#374151" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "light" ? "#fff" : "#1f2937",
                  border: `1px solid ${
                    theme === "light" ? "#e5e7eb" : "#374151"
                  }`,
                  borderRadius: "0.5rem",
                  color: theme === "light" ? "#111827" : "#f9fafb",
                }}
              />
              <Bar
                dataKey="stock"
                fill={theme === "light" ? "#3b82f6" : "#60a5fa"}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Category */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Sales by Category</h2>
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              Last 30 days
            </div>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {salesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "light" ? "#fff" : "#1f2937",
                    border: `1px solid ${
                      theme === "light" ? "#e5e7eb" : "#374151"
                    }`,
                    borderRadius: "0.5rem",
                    color: theme === "light" ? "#111827" : "#f9fafb",
                  }}
                  formatter={(value) => [`₹${value}`, "Revenue"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Top Selling Products</h2>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                    Product
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                    Sales
                  </th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.map((item, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="py-3 px-2">{item.product}</td>
                    <td className="py-3 px-2">{item.category}</td>
                    <td className="py-3 px-2 text-right font-medium">
                      {item.sales}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Low Stock Alerts</h2>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-800/30 flex items-center justify-center mr-3">
                    <Package className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium">{item.product}</p>
                    <p className="text-sm text-muted-foreground">
                      Current stock: {item.stock}
                    </p>
                  </div>
                </div>
                <button className="px-3 py-1 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-800/50 text-amber-800 dark:text-amber-200">
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
