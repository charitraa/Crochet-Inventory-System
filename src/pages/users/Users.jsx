import React from "react";
import { FiImage } from "react-icons/fi";
import Dashboard from "../../components/dashboard/Dashboard";

const AddUser = () => {
  return (
    <Dashboard
      mainContent={
        <div className="p-6">
          {/* Title & Breadcrumb Container */}
          <div className="flex flex-col items-start">
            <div className="mb-0 text-2xl font-bold text-black">
              Add User
            </div>

            {/* Breadcrumb */}
            <div className="text-sm text-gray-500">
              Home &gt; All Users &gt;{" "}
              <span className="font-semibold text-gray-800">
                Add New User
              </span>
            </div>
          </div>



          {/* Main Form */}
          <form className="bg-white p-6 rounded-md shadow-md max-w-5xl">
            <div className="grid grid-cols-2 gap-6"> 
              {/* Full Name */}
              <div>
                <label className="block font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Type full name here"
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <p className="text-xs text-gray-500">Enter the full name of the user</p>
              </div>

              {/* Email Address */}
              <div>
                <label className="block font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Type email address here"
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <p className="text-xs text-gray-500">Enter a valid email address</p>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="Type phone number here"
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <p className="text-xs text-gray-500">Enter the phone number</p>
              </div>

              {/* Role */}
              <div>
                <label className="block font-semibold mb-1">Role</label>
                <select className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300">
                  <option>Select role</option>
                  <option>Option1</option>
                  <option>Option2</option>
                  <option>Option3</option>
                </select>
                <p className="text-xs text-gray-500">Select the user role</p>
              </div>

              {/* Password */}
              <div>
                <label className="block font-semibold mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Type password here"
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <p className="text-xs text-gray-500">Set a secure password for the user</p>
              </div>
            </div>

            {/* User Profile Image Upload */}
            <div className="mt-6">
              <label className="block font-semibold mb-2">User Profile</label>
              <div className="border-2 border-dashed border-gray-300 rounded p-6 flex flex-col items-center justify-center">
                <FiImage className="text-gray-500 text-3xl mb-2" />
                <p className="text-gray-500">Drop your image here, or browse</p>
                <p className="text-gray-500">JPG, PNG are allowed</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-start space-x-4 mt-6">
              <button
                type="submit"
                className="w-32 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 border border-pink-500"
              >
                ADD
              </button>
              <button
                type="button"
                className="w-32 px-4 py-2 bg-white text-black rounded hover:bg-gray-400 border border-pink-500"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      }
    />
  );
};

export default AddUser;
