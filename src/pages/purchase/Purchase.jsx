import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";

const Purchase = () => {
  return (
    <Dashboard
      mainContent={
        <div className="p-6">
          {/* Page Title and Breadcrumb */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Purchase</h2>
            <p className="text-sm text-gray-500">Home &gt; Purchase</p>
          </div>

          {/* Add Purchased Orders Section */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">Add Purchased Orders</h3>

            <form>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Material Name */}
                <div>
                  <label className="block text-gray-700">Material Name</label>
                  <input
                    type="text"
                    placeholder="Type material name here"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                  <p className="text-xs text-gray-500">Enter the material name</p>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-gray-700">Price</label>
                  <input
                    type="text"
                    placeholder="Type price here"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                  <p className="text-xs text-gray-500">Enter the price of the product</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Quantity */}
                <div>
                  <label className="block text-gray-700">Quantity</label>
                  <input
                    type="text"
                    placeholder="Type quantity here"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                  <p className="text-xs text-gray-500">Enter the quantity of the product</p>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-gray-700">Type</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300">
                    <option>Select product type</option>
                  </select>
                  <p className="text-xs text-gray-500">Select the product type</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Colour Type */}
                <div>
                  <label className="block text-gray-700">Colour Type</label>
                  <input
                    type="text"
                    placeholder="Type colour type here"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                  <p className="text-xs text-gray-500">Enter the colour type</p>
                </div>

                {/* Purchased Date */}
                <div>
                  <label className="block text-gray-700">Purchased Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                  <p className="text-xs text-gray-500">Select the Date</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 mt-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                  ADD
                </button>
                <button className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-200">
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    />
  );
};

export default Purchase;