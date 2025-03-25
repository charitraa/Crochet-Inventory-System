import React, { useContext, useState, useEffect } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { AppContext } from "../../context/ContextApp";
import { useNavigate, useParams } from "react-router-dom";
import useGet from "../../customHooks/useGet";
import usePut from "../../customHooks/usePut";
import { baseUrl } from "../../constant/base.url";
import useDelete from "../../customHooks/useDelete";

const EditProducts = () => {
  const [data, setData] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
    image: null,
    category: "",
  });

  const { id } = useParams(); // Get the product ID from the URL parameters
  const { showToast } = useContext(AppContext);
  const { newData: product, isLoading } = useGet(`product/get/${id}/`); // Fetch product data using a custom hook
  const { update } = usePut(`product/edit/${id}/`); // Use PUT method to update product data
  const navigate = useNavigate();
  const { newData: categories } = useGet("category/all/");
  const { handleDelete } = useDelete();

  useEffect(() => {
    if (product) {
      setData({
        productName: product.productName,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: product.image,
        category: product.category,
      });
    }
  }, [product]);

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
  const Delete = async (e, id) => {
    e.preventDefault();

    try {
      const check = await handleDelete(`product/delete/${id}/`); // Wait for response

      if (check) {
        showToast("Materials deleted successfully", "success");

        navigate('/app/products');
      } else {
        showToast("Failed to delete Materials", "error");
      }
    } catch (error) {
      showToast("Something went wrong!", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productName: data.productName,
      description: data.description,
      price: data.price,
      stock: data.stock,
      category: data.category,
      image: data.image,
    };

    const result = await update(updatedProduct); // Wait for the PUT request to update
    if (result) {
      showToast("Product updated successfully", "success");
      navigate("/app/products"); // Redirect to the products list page
    } else {
      showToast("Error updating product", "error");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Dashboard
      mainContent={
        <div className="p-6">
          <div className="flex flex-col items-start">
            <div className="mb-0 text-2xl font-bold text-black">Edit Product</div>
            <div className="text-sm text-gray-500">
              Home &gt; Products &gt; <span className="font-semibold text-gray-800">Edit Product</span>
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
                    placeholder="Type description here"
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

                <div className="mb-4">
                  <label className="block font-semibold mb-1">Price</label>
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

              {/* RIGHT COLUMN (Image Upload & Preview) */}
              <div className="col-span-1">
                <div className="w-full h-56 border border-gray-300 rounded flex items-center justify-center mb-4 bg-gray-100">
                  <div className="w-full h-56 border border-gray-300 rounded flex items-center justify-center mb-4 bg-gray-100">
                    {data.image ? (
                      typeof data.image === "string" ? (
                        <img src={`${baseUrl}${data.image}`} alt="Preview" className="h-full w-full object-cover rounded" />
                      ) : (
                        <img src={URL.createObjectURL(data.image)} alt="Preview" className="h-full w-full object-cover rounded" />
                      )
                    ) : (
                      <span className="text-gray-500">Image Preview</span>
                    )}
                  </div>

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
                Save
              </button>
              <button
                onClick={(e) => Delete(e, id)}
                className="w-32 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 border border-red-500"
              >
                Delete
              </button>

              <button
                type="button"
                className="w-32 px-4 py-2 bg-white text-black rounded hover:bg-gray-400 border border-pink-500"
                onClick={() => navigate("/app/products")}
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

export default EditProducts;
