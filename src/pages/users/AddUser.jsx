import React, { useState, useContext } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { AppContext } from "../../context/ContextApp";
import useFormPost from "../../customHooks/useFormPost";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [userData, setUserData] = useState({
    full_name: "",
    phone_number: "",
    address: "",
    email: "",
    role: "",
  });

  const { showToast } = useContext(AppContext);
  const { save } = useFormPost("user/create/", userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    const success = await save(formData);
    if (success) {
      setUserData({
        fullName: "",

        phone_number: "",
        address: "",

        role: "",

      });
      showToast("User added successfully", "success");
    }
  };

  return (
    <Dashboard
      mainContent={
        <div className="p-6">
          <div className="flex flex-col items-start">
            <div className="mb-0 text-2xl font-bold text-black">Add User</div>
            <div className="text-sm text-gray-500">
              Home &gt; All Users &gt; <span className="font-semibold text-gray-800">Add New User</span>
            </div>
          </div>

          <form
            className="bg-white p-6 rounded-md shadow-md max-w-5xl mt-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
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
                  value={userData.role}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:ring-2 focus:ring-pink-300"
                >
                  <option value="">Select role</option>
                  <option value="admin">Admin</option>
                  <option value="general">General</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="submit"
                className="w-32 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 border border-pink-500"
              >
                Add User
              </button>

              <button
                type="button"
                className="w-32 px-4 py-2 bg-white text-black rounded hover:bg-gray-400 border border-pink-500"
                onClick={() => {
                  setUserData({
                    fullName: "",
                    phone_number: "",
                    address: "",
                    email: "",
                    role: "",
                  })
                  navigate("/app/users");
                }
                }
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

export default AddUser;
