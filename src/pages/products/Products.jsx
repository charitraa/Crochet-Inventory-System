import React from "react";
import { FiImage } from "react-icons/fi"; // Importing the Image Icon
import Dashboard from "../../components/dashboard/Dashboard";

const Home = () => {
  return (
    <Dashboard
      mainContent={
        <div className="p-6">
          {/* Title & Breadcrumb Container */}
          <div className="flex flex-col items-start">
            <div className="mb-0 text-2xl font-bold text-black">
              Add Product
            </div>

            {/* Breadcrumb */}
            <div className="text-sm text-gray-500">
              Home &gt; All Products &gt;{" "}
              <span className="font-semibold text-gray-800">
                Add New Product
              </span>
            </div>
          </div>

          {/* Main Form */}
          <form className="bg-white p-6 rounded-md shadow-md max-w-5xl mt-4">
            <div className="grid grid-cols-3 gap-10">
              {/* LEFT COLUMN (Form Fields) */}
              <div className="col-span-2">
                {/* Product Name */}
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Product Name</label>
                  <input
                    type="text"
                    placeholder="Type name here"
                    className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Description</label>
                  <textarea
                    placeholder="Type Description here"
                    className="border border-gray-300 rounded w-full px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="Type category here"
                    className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                {/* Brand Name */}
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Brand Name</label>
                  <input
                    type="text"
                    placeholder="Type brand name here"
                    className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                {/* Stock Quantity */}
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                {/* Regular Price & Sale Price */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-semibold mb-1">Regular Price</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Sale Price</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                  </div>
                </div>

                {/* Tag */}
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Tag</label>
                  <input
                    type="text"
                    placeholder="Enter tag here"
                    className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN (Image Preview & Product Gallery) */}
              <div className="col-span-1">
                {/* Image Preview Section */}
                <div className="w-full h-56 border border-gray-300 rounded flex items-center justify-center mb-4 bg-gray-100">
                  <span className="text-gray-500">Image Preview</span>
                </div>

                {/* Product Gallery */}
                <label className="block font-semibold mb-2">Product Gallery</label>
                <div className="border-2 border-dashed border-gray-300 rounded p-4 flex flex-col items-center justify-center mb-4">
                  <FiImage className="text-gray-500 text-3xl mb-2" /> {/* Image Icon */}
                  <p className="text-gray-500">Drop your images here, or browse.</p>
                  <p className="text-gray-500">JPG, PNG are allowed</p>
                </div>
              </div>
            </div>

            {/* Buttons (Bottom) */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="submit"
                className="w-32 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 border border-pink-500"
              >
                Add
              </button>

              <button
                type="button"
                className="w-32 px-4 py-2 bg-white text-black rounded hover:bg-gray-400 border border-pink-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      }
    />
  );
};

export default Home;
