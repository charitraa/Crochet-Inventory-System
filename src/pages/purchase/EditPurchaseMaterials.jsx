import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import useGet from "../../customHooks/useGet";
import usePut from "../../customHooks/usePut";

import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/ContextApp";

const EditPurchaseMaterials = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    material: "",
    size: "none",
    type: "none",
    color: "none",
    quantity: "",
    price: ""
  });
  const { showToast } = useContext(AppContext);
  const [sizes, setSizes] = useState([]);
  const [types, setTypes] = useState([]);
  const [sizeApi, setSizeApi] = useState("");
  const [typeApi, setTypeApi] = useState("");
  const { newData: materials, isLoading: materialsLoading } = useGet("material/all/");
  const { newData: purchaseData } = useGet(`purchase_material/get/${id}/`);
  const { newData: colors } = useGet("color/all/");
  const { update } = usePut(`purchase_material/edit/${id}/`);

  useEffect(() => {
    if (purchaseData) {
      setFormData({
        material: purchaseData.material || "",
        size: purchaseData.size || "none",
        type: purchaseData.type || "none",
        color: purchaseData.color || "none",
        quantity: purchaseData.quantity || "",
        price: purchaseData.price || ""
      });
    }
  }, [purchaseData]);

  useEffect(() => {
    if (formData.material) {
      let sizeEndpoint = "";
      let typeEndpoint = "";

      switch (formData.material) {
        case "bag":
          sizeEndpoint = "size/all/";
          break;
        case "stick":
          sizeEndpoint = "size/all/";
          break;
        case "beads":
          sizeEndpoint = "beads_size/all/";
          typeEndpoint = "beads_type/all/";
          break;
        case "glue":
          typeEndpoint = "glue_type/all/";
          break;
        case "ribbon":
          sizeEndpoint = "ribbon_size/all/";
          typeEndpoint = "ribbon_type/all/";
          break;
        case "keyring":
          typeEndpoint = "keyring_type/all/";
          break;
        case "wrapper":
          typeEndpoint = "wrapper_type/all/";
          break;
        case "wire":
          sizeEndpoint = "wire_size/all/";
          typeEndpoint = "wire_type/all/";
          break;
        case "yarn":
          sizeEndpoint = "yarn_size/all/";
          typeEndpoint = "yarn_type/all/";
          break;
        default:
          sizeEndpoint = "";
          typeEndpoint = "";
      }

      setSizeApi(sizeEndpoint);
      setTypeApi(typeEndpoint);
    }
  }, [formData.material]);

  const { newData: fetchedSizes } = useGet(sizeApi, sizeApi !== "");
  const { newData: fetchedTypes } = useGet(typeApi, typeApi !== "");

  useEffect(() => {
    setSizes(fetchedSizes?.length ? fetchedSizes : [{ name: "none" }]);
  }, [fetchedSizes]);

  useEffect(() => {
    setTypes(fetchedTypes?.length ? fetchedTypes : [{ name: "none" }]);
  }, [fetchedTypes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = update(formData);
    if (result) {
      showToast("Purchase material updated successfully", 'success');
      navigate(`/app/purchase`);
    } else {
      showToast("Failed to update purchase material", 'error');
    }
  };

  return (
    <Dashboard
      mainContent={
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Edit Purchase</h2>
            <p className="text-sm text-gray-500">Home &gt; Purchase &gt; Edit</p>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">Edit Purchase Order</h3>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700">Material Name</label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  >
                    <option value="">Select material</option>
                    {materials?.map((mat) => (
                      <option key={mat.name} value={mat.name}>
                        {mat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700">Color</label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                    value={formData.color || 'none'}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  >
                    <option value="">Select color</option>
                    {colors?.map((color) => (
                      <option key={color.name} value={color.name}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700">Size</label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                    value={formData.size || 'none'}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  >
                    <option value="">Select size</option>
                    {sizes?.map((size) => (
                      <option key={size.name} value={size.name}>
                        {size.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700">Type</label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                    value={formData.type || 'none'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="">Select type</option>
                    {types?.map((type) => (
                      <option key={type.name} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700">Quantity</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Price</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-4">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                  UPDATE
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/app/purchase")}
                  className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-200"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    />
  );
};

export default EditPurchaseMaterials;
