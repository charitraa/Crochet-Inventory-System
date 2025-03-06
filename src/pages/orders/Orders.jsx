import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { FiSearch, FiPlus } from "react-icons/fi";

const Orders = () => {
  return (
    <Dashboard
      mainContent={
        <div className="p-6">
          {/* Search Bar Above Title */}
          <div className="mb-4">
            <div className="relative w-1/4">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded pl-3 pr-12 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 w-full ml-1"
              />
              <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          {/* Title and Controls */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-black">Orders</h1>
            <div className="flex items-center space-x-4">
              <select className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300">
                <option>All Orders</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
              <button className="flex items-center space-x-2 bg-blue-500 text-white px-8 py-2 rounded hover:bg-blue-600 whitespace-nowrap">
                <FiPlus /> <span>New Order</span>
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Order ID</th>
                  <th className="text-left p-2">Order Item</th>
                  <th className="text-left p-2">Order Date</th>
                  <th className="text-left p-2">Quantity</th>
                  <th className="text-left p-2">Customer Name</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Price</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      }
    />
  );
};

export default Orders;
