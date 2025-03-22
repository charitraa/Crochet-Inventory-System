import React, { useContext, useState, useEffect } from "react";
import { FiImage } from "react-icons/fi"; // Importing the Image Icon
import Dashboard from "../../components/dashboard/Dashboard";
import { AppContext } from "../../context/ContextApp";
import { useNavigate, useParams } from "react-router-dom";
import useGet from "../../customHooks/useGet";
import usePut from "../../customHooks/usePut";

const EditMaterials = () => {
  const [data, setData] = useState({
    name: "",
  });
  const { id } = useParams(); // Get the material ID from the URL parameters
  const { showToast } = useContext(AppContext);
  const { newData: material, isLoading } = useGet(`material/get/${id}/`); // Fetch material data using a custom hook
  const { update } = usePut(`material/edit/${id}/`); // Use PUT method to update material data

  const navigate = useNavigate();

  // Fetch material data on mount
  useEffect(() => {
    if (material) {
      setData({
        name: material.name,
      });
    }
  }, [material]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedMaterial = {
      name: data.name,
      type: data.type,
      description: data.description,
    };

    const result = await update(updatedMaterial); // Wait for the PUT request to update
    if (result) {
      showToast("Material updated successfully", "success");
      navigate("/app/materials"); // Redirect to the materials list page
    } else {
      showToast("Error updating material", "error");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Dashboard
      mainContent={
        <div className="p-6">
          {/* Title & Breadcrumb Container */}
          <div className="flex flex-col items-start">
            <div className="mb-0 text-2xl font-bold text-black">Edit Material</div>

            {/* Breadcrumb */}
            <div className="text-sm text-gray-500">
              Materials &gt; All Materials &gt;{" "}
              <span className="font-semibold text-gray-800">Edit Material</span>
            </div>
          </div>

          {/* Main Form */}
          <form
            className="bg-white p-6 rounded-md shadow-md max-w-5xl mt-4"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-3 gap-10">
              {/* LEFT COLUMN (Form Fields) */}
              <div className="col-span-2">
                {/* Material Name */}
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Material Name</label>
                  <input
                    type="text"
                    value={data.name}
                    onChange={handleChange}
                    name="name"
                    id="name"
                    placeholder="Type name here"
                    className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>

              </div>
            </div>

            {/* Buttons (Bottom) */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="submit"
                className="w-32 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 border border-pink-500"
              >
                Save
              </button>

              <button
                type="button"
                className="w-32 px-4 py-2 bg-white text-black rounded hover:bg-gray-400 border border-pink-500"
                onClick={() => navigate("/app/materials")}
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

export default EditMaterials;
