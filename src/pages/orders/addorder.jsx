import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import useGet from "../../customHooks/useGet";
import usePost from "../../customHooks/usePost";
import { AppContext } from "../../context/ContextApp";
import { useNavigate } from "react-router-dom";

const AddOrders = () => {
  const [orderData, setOrderData] = useState({
    user: "",
    items: [],
  });

  const { newData: users, isLoading: isUsersLoading } = useGet("user/all/");
  const { newData: products, isLoading: isProductsLoading } = useGet("product/all/");

  const handleCustomerChange = (e) => {
    setOrderData((prevData) => ({ ...prevData, user: e.target.value }));
  };

  const navigate = useNavigate();

  const handleProductSelect = (e) => {
    const selectedProductId = e.target.value;
    if (!selectedProductId) return;

    const selectedProduct = products.find((p) => p.id === selectedProductId);

    if (selectedProduct && !orderData.items.some((p) => p.productId === selectedProduct.id)) {
      setOrderData((prevData) => ({
        ...prevData,
        items: [
          ...prevData.items,
          { product: selectedProduct.id, product_name: selectedProduct.productName, price: selectedProduct.price, quantity: 1 },
        ],
      }));
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setOrderData((prevData) => ({
      ...prevData,
      items: prevData.items.map((p) =>
        p.product === productId ? { ...p, quantity: Number(quantity) } : p
      ),
    }));
  };

  const handleRemoveProduct = (productId) => {
    setOrderData((prevData) => ({
      ...prevData,
      items: prevData.items.filter((p) => p.product !== productId),
    }));
  };
  const { showToast } = useContext(AppContext)
  const { save } = usePost("order/create/", orderData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const check = await save();

    if (check) {
      setOrderData({ user: "", items: [] })
      showToast("Order added successfully!", "success");
      navigate('/app/orders')

    }
  };

  return (
    <Dashboard
      mainContent={
        <div className="p-6">
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-bold text-black">Add Order</h1>
            <p className="text-sm text-gray-500">
              Home &gt; Orders &gt; <span className="font-semibold text-gray-800">Add New Order</span>
            </p>
          </div>

          <form className="bg-white p-6 rounded-md shadow-md max-w-4xl mt-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              {/* Customer Dropdown */}
              <div>
                <label className="block font-semibold mb-1">Customer Name</label>
                <select
                  name="user"
                  value={orderData.user}
                  onChange={handleCustomerChange}
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  <option value="">Select Customer</option>
                  {users?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.full_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Selection Dropdown */}
              <div>
                <label className="block font-semibold mb-1">Select Product</label>
                <select
                  name="product"
                  onChange={handleProductSelect}
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  <option value="">Select Product</option>
                  {products?.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.productName} - Rs.{product.price}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Products */}
            {orderData.items.length > 0 && (
              <div className="mt-4">
                <h2 className="font-semibold text-lg">Selected Products</h2>
                <div className="bg-gray-100 p-4 rounded-md">
                  {orderData.items.map((product) => (
                    <div key={product.product} className="flex items-center justify-between bg-white p-2 rounded-md shadow-md mt-2">
                      <div>
                        <p className="font-semibold">{product.product_name}</p>
                        <p className="text-sm text-gray-600">Rs.{product.price}</p>
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(product.product, e.target.value)}
                        className="border border-gray-300 w-16 px-2 py-1 rounded-md text-center"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(product.product)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✖
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="submit"
                className="w-32 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 border border-pink-500"
              >
                Add Order
              </button>

              <button
                type="button"
                onClick={() => navigate('/app/orders')}
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

export default AddOrders;
