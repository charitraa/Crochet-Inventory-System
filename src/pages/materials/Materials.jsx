import React, { useEffect, useState } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { useNavigate } from "react-router-dom";

const Materials = () => {
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from API (replace with actual API URL)
    const fetchMaterials = async () => {
      try {
        const response = await fetch("/api/materials");
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, []);

  return (
    <Dashboard
      mainContent={
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">All Materials</h1>
            <button className="bg-black text-white px-4 py-2 rounded flex items-center" onClick={() => navigate("/app/add-materials")}>
              ➕ Add New Material
            </button>
          </div>

          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Material Id</th>
                <th className="border p-2">Material Name</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Colour</th>
                <th className="border p-2">Stock</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.length > 0 ? (
                materials.map((material) => (
                  <tr key={material.id} className="text-center">
                    <td className="border p-2">{material.id}</td>
                    <td className="border p-2">{material.name}</td>
                    <td className="border p-2">{material.category}</td>
                    <td className="border p-2">{material.color}</td>
                    <td className="border p-2">{material.stock}</td>
                    <td className="border p-2">${material.price}</td>
                    <td className="border p-2">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-red-500 p-4">
                    No materials found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }
    />
  );
};

export default Materials;
