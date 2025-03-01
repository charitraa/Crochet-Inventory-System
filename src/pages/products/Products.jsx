import React, { useContext, useState } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { AppContext } from "../../context/ContextApp";
import { useNavigate } from "react-router-dom";
import useGet from "../../customHooks/useGet";
import useFormPost from "../../customHooks/useFormPost";

const Products = () => {
  const [data, setData] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
    image: null,
    category: "",
  });

  const { showToast } = useContext(AppContext);
  const { save } = useFormPost("product/add-product/", data);
  const { newData: categories, isLoading } = useGet("product/category/");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setData((prevData) => ({ ...prevData, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const check = await save();
    if (check) {
      setData({
        productName: "",
        description: "",
        price: "",
        stock: "",
        image: null,
        category: "",
      });
      showToast("Product saved successfully", "success");
    }
  };

  return (
    <Dashboard
      mainContent={
        <div className="p-6">
          <div className="flex flex-col items-start">
            <div className="mb-0 text-2xl font-bold text-black">Add Product</div>
            <div className="text-sm text-gray-500">
              Home &gt; All Products &gt; <span className="font-semibold text-gray-800">Add New Product</span>
            </div>
          </div>

          <form className="bg-white p-6 rounded-md shadow-md max-w-5xl mt-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-10">
              {/* LEFT COLUMN (Form Fields) */}
              <div className="col-span-2">
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={data.productName}
                    onChange={handleChange}
                    placeholder="Type name here"
                    className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-1">Description</label>
                  <textarea
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    placeholder="Type Description here"
                    className="border border-gray-300 rounded w-full px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    name="category"
                    value={data.category}
                    onChange={handleChange}
                    className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  >
                    <option value="">Select a category</option>
                    {isLoading ? (
                      <option disabled>Loading...</option>
                    ) : (
                      categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    name="stock"
                    value={data.stock}
                    onChange={handleChange}
                    placeholder="0"
                    className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-semibold mb-1">Regular Price</label>
                    <input
                      type="number"
                      name="price"
                      value={data.price}
                      onChange={handleChange}
                      placeholder="0"
                      className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (Image Upload & Preview) */}
              <div className="col-span-1">
                <div className="w-full h-56 border border-gray-300 rounded flex items-center justify-center mb-4 bg-gray-100">
                  {data.image ? (
                    <img src={URL.createObjectURL(data.image)} alt="Preview" className="h-full w-full object-cover rounded" />
                  ) : (
                    <span className="text-gray-500">Image Preview</span>
                  )}
                </div>

                <label className="block font-semibold mb-2">Upload Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
              </div>
            </div>

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

export default Products;
