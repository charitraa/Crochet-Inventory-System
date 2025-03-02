import React, { useContext } from "react";
import { AppContext } from "../../context/ContextApp";

const MyProfile = () => {
  const { user } = useContext(AppContext)
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Welcome, {user?.username}</h2>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-6">
          <img
            src={user?.profile_pic}
            alt="profile"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold">{user?.full_name}</h3>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <label className="text-gray-600">Full Name</label>
            <input
              type="text"
              value={user.full_name}
              placeholder="Your First Name"
              className="border w-full p-2 rounded-md mt-1"
            />
          </div>
          <div>
            <label className="text-gray-600">Username</label>
            <input
              type="text"
              value={user?.username}
              placeholder="Your Username"
              className="border w-full p-2 rounded-md mt-1"
            />
          </div>
          <div>
            <label className="text-gray-600">Phone Number</label>
            <input
              type="text"
              value={user?.phone_number}
              placeholder="Your Username"
              className="border w-full p-2 rounded-md mt-1"
            />
          </div>
          <div>
            <label className="text-gray-600">Address</label>
            <input
              type="text"
              value={user?.address}
              placeholder="Your Username"
              className="border w-full p-2 rounded-md mt-1"
            />
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex justify-end mt-6">
          <button className="bg-pink-400 text-white px-6 py-2 rounded-md">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
