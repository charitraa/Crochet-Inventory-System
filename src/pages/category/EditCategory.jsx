import React, { useContext, useState, useEffect } from "react";
import { FiImage } from "react-icons/fi"; // Importing the Image Icon
import Dashboard from "../../components/dashboard/Dashboard";
import { AppContext } from "../../context/ContextApp";
import { useNavigate, useParams } from "react-router-dom";
import useGet from "../../customHooks/useGet";
import usePut from "../../customHooks/usePut";

const EditCategory = () => {
  const [data, setData] = useState({
    name: "",
  });
  const { id } = useParams();
  const { showToast } = useContext(AppContext);
  const { newData: category, isLoading } = useGet(`category/get/${id}/`);
  const { update } = usePut(`category/edit/${id}/`);

  const navigate = useNavigate();

  // Fetch category data on mount
  useEffect(() => {
    if (category) {
      setData({
        name: category.name,
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedCategory = {
      name: data.name,
    };
    const result = update(updatedCategory);
    if (result) {
      showToast("Category updated successfully", "success");
      navigate("/app/category");
    } else {
      showToast("Error updating category", "error");
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
            <div className="mb-0 text-2xl font-bold text-black">Edit Category</div>

            {/* Breadcrumb */}
            <div className="text-sm text-gray-500">
              Category &gt; All Category &gt;{" "}
              <span className="font-semibold text-gray-800">Edit Category</span>
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
                {/* Category Name */}
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Category Name</label>
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
                onClick={() => navigate("/app/category")}
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

export default EditCategory;
