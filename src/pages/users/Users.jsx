import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";

const Users = () => {
  const users = [
    {
      name: "Sita Sakha",
      phone: "9867578993",
      email: "sita@gmail.com",
      status: "Active",
      role: "Admin",
    },
    {
      name: "Usha Pun",
      phone: "9824564622",
      email: "usha@gmail.com",
      status: "Inactive",
      role: "User",
    },
  ];

  return (
    <Dashboard
      mainContent={
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Users</h2>
            <div className="space-x-4">
              <button className="bg-pink-300 text-black px-4 py-2 rounded-lg">
                Add more
              </button>
              <button className="bg-pink-300 text-black px-4 py-2 rounded-lg">
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">User Name</th>
                  <th className="py-2 px-4 text-left">Phone Number</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Role</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.phone}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded-lg text-white text-sm ${user.status === "Active"
                            ? "bg-green-400"
                            : "bg-yellow-400"
                          }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">{user.role}</td>
                    <td className="py-2 px-4 space-x-2">
                      <button className="text-blue-500">👁️</button>
                      <button className="text-blue-500">✏️</button>
                      <button className="text-red-500">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    />
  );
};

export default Users;
