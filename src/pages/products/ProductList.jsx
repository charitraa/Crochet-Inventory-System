import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import useGet from "../../customHooks/useGet";
import { baseUrl } from "../../constant/base.url";

const ProductList = () => {
  const { newData: products, isLoading, error } = useGet("product/all/");
  const navigate = useNavigate();

  return (
    <Dashboard mainContent={
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">All Products</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={() => navigate('/app/add-products')}
          >
            + Add New Product
          </button>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error loading products. Please try again later.</p>
        ) : products?.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition border border-gray-200"
                onClick={() => navigate(`/app/edit-product/${product.id}`)}>
                {/* Product Image */}
                <img
                  src={`${baseUrl}${product.image}` || "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                {/* Product Info */}
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="text-blue-600 font-bold mt-2">Rs. {product.price}</p>

                {/* Stats */}
                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                  <div className="flex flex-col">
                    <span className="font-medium">Stock</span>
                    <span className="text-gray-700">{product.stock}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">Status</span>
                    <span className="text-gray-700">{product.available_status ? "available" : "unavailable"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    } />
  );
};

export default ProductList;
