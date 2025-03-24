import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import useGet from "../../customHooks/useGet";
import usePut from "../../customHooks/usePut";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/ContextApp";

const EditPurchaseMaterials = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useContext(AppContext);

  // Form state
  const [formData, setFormData] = useState({
    material: "",
    size: "none",
    type: "none",
    color: "none",
    quantity: "",
    price: ""
  });

  // Options state
  const [sizes, setSizes] = useState([]);
  const [types, setTypes] = useState([]);
  const [sizeApi, setSizeApi] = useState(null);
  const [typeApi, setTypeApi] = useState(null);

  // API calls
  const { newData: materials, isLoading: materialsLoading } = useGet("material/all/");
  const { newData: purchaseData, error: purchaseError } = useGet(`purchase_material/get/${id}/`);
  const { newData: colors, error: colorsError } = useGet("color/all/");
  const { newData: fetchedSizes, error: sizesError } = useGet(sizeApi, !!sizeApi);
  const { newData: fetchedTypes, error: typesError } = useGet(typeApi, !!typeApi);
  const { update } = usePut(`purchase_material/edit/${id}/`);

  // Initialize form with purchase data
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

  // Set API endpoints based on material selection
  useEffect(() => {
    if (!formData.material) {
      setSizeApi(null);
      setTypeApi(null);
      return;
    }

    const endpoints = {
      bag: { size: "size/all/" },
      stick: { size: "size/all/" },
      beads: { size: "beads_size/all/", type: "beads_type/all/" },
      glue: { type: "glue_type/all/" },
      ribbon: { size: "ribbon_size/all/", type: "ribbon_type/all/" },
      keyring: { type: "keyring_type/all/" },
      wrapper: { type: "wrapper_type/all/" },
      wire: { size: "wire_size/all/", type: "wire_type/all/" },
      yarn: { size: "yarn_size/all/", type: "yarn_type/all/" }
    };

    const materialEndpoints = endpoints[formData.material] || {};
    setSizeApi(materialEndpoints.size || null);
    setTypeApi(materialEndpoints.type || null);
  }, [formData.material]);

  // Process sizes data
  useEffect(() => {
    if (fetchedSizes) {
      setSizes(Array.isArray(fetchedSizes) ? fetchedSizes : []);
    } else {
      setSizes([]);
    }
  }, [fetchedSizes]);

  // Process types data
  useEffect(() => {
    if (fetchedTypes) {
      setTypes(Array.isArray(fetchedTypes) ? fetchedTypes : []);
    } else {
      setTypes([]);
    }
  }, [fetchedTypes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await update(formData);
      if (result) {
        showToast("Purchase material updated successfully", 'success');
        navigate(`/app/purchase`);
      } else {
        showToast("Failed to update purchase material", 'error');
      }
    } catch (error) {
      showToast("An error occurred while updating", 'error');
      console.error("Update error:", error);
    }
  };

  // Show loading state if data is being fetched
  if (materialsLoading || !purchaseData) {
    return (
      <Dashboard
        mainContent={
          <div className="p-6">
            <div className="flex justify-center items-center h-64">
              <p>Loading...</p>
            </div>
          </div>
        }
      />
    );
  }

  // Show error if there's an issue fetching purchase data
  if (purchaseError) {
    return (
      <Dashboard
        mainContent={
          <div className="p-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Error loading purchase data: {purchaseError.message}
            </div>
          </div>
        }
      />
    );
  }

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
                    required
                  >
                    <option value="">Select material</option>
                    {Array.isArray(materials) && materials.map((mat) => (
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
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    required
                  >
                    <option value="">Select color</option>
                    {Array.isArray(colors) && colors.map((color) => (
                      <option key={color.name} value={color.name}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {sizeApi && (
                  <div>
                    <label className="block text-gray-700">Size</label>
                    <select
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    >
                      <option value="none">Select size</option>
                      {Array.isArray(sizes) && sizes.map((size) => (
                        <option key={size.name} value={size.name}>
                          {size.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {typeApi && (
                  <div>
                    <label className="block text-gray-700">Type</label>
                    <select
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="none">Select type</option>
                      {Array.isArray(types) && types.map((type) => (
                        <option key={type.name} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700">Quantity</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Price</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
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