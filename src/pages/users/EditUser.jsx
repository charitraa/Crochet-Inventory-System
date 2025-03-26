import React, { useState, useContext, useEffect } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { AppContext } from "../../context/ContextApp";// Custom hook to fetch data // Custom hook for PUT request
import { useNavigate, useParams } from "react-router-dom";
import usePut from "../../customHooks/usePut";
import useGet from "../../customHooks/useGet";

const EditUser = () => {
  const { id } = useParams(); // Getting the user ID from the URL params
  const { showToast } = useContext(AppContext);
  const { newData: user, isLoading } = useGet(`user/get/${id}/`); // Fetching user data by ID
  const { update } = usePut(`user/update/${id}/`); // API call for updating user data

  const [userData, setUserData] = useState({
    full_name: "",
    phone_number: "",
    address: "",
    email: "",
    role: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserData({
        full_name: user.full_name || "",
        phone_number: user.phone_number || "",
        address: user.address || "",
        email: user.email || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    const success = await update(formData); // Use PUT request to update user data
    if (success) {
      showToast("User updated successfully", "success");
      navigate("/app/users");
    } else {
      showToast("Failed to update user", "error");
    }
  };

  if (isLoading) return <div>Loading...</div>; // Loading state

  return (
    <Dashboard
      mainContent={
        <div className="p-6">
          <div className="flex flex-col items-start">
            <div className="mb-0 text-2xl font-bold text-black">Edit User</div>
            <div className="text-sm text-gray-500">
              Home &gt; All Users &gt; <span className="font-semibold text-gray-800">Edit User</span>
            </div>
          </div>

          <form
            className="bg-white p-6 rounded-md shadow-md max-w-5xl mt-4"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={userData.full_name}
                  onChange={handleChange}
                  placeholder="Type full name here"
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  placeholder="Type address here"
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone_number"
                  value={userData.phone_number}
                  onChange={handleChange}
                  placeholder="Type phone number here"
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Type email here"
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Role</label>
                <select
                  name="role"
                  value={userData.role ? "admin" : "general"} // Convert boolean to role string
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:ring-2 focus:ring-pink-300"
                >
                  <option value="general">General</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="submit"
                className="w-32 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 border border-pink-500"
              >
                Update User
              </button>

              <button
                type="button"
                className="w-32 px-4 py-2 bg-white text-black rounded hover:bg-gray-400 border border-pink-500"
                onClick={() => {
                  navigate("/app/users");
                }}
              >
                Cancel
              </button>
            </div>
          </form >
        </div >
      }
    />
  );
};

export default EditUser;
