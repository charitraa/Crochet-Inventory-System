import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import useGet from "../../customHooks/useGet";
import { useNavigate } from "react-router-dom";
import useFormPost from "../../customHooks/useFormPost";
import { AppContext } from "../../context/ContextApp";

const Purchase = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    material: "",
    color: "",
    size: "",
    type: "",
    quantity: "",
    price: "",
  });

  // Fetch materials, sizes, colors, and types
  const { newData: materials, isLoading: materialsLoading } = useGet("material/all/");
  const { newData: colors } = useGet("color/all/");
  const { showToast } = useContext(AppContext);
  const { save } = useFormPost("purchase_material/add/", formData);

  // State for form inputs
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [sizes, setSizes] = useState([]);
  const [types, setTypes] = useState([]);
  const [sizeApi, setSizeApi] = useState(null);
  const [typeApi, setTypeApi] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const check = await save(); // Pass correct data
    if (check) {
      setFormData({ material: "", color: "", size: "", type: "", quantity: "", price: "" });
      showToast("Product saved successfully", "success");
    }
  };


  useEffect(() => {
    if (!selectedMaterial) {
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

    const materialEndpoints = endpoints[selectedMaterial] || {};
    setSizeApi(materialEndpoints.size || null);
    setTypeApi(materialEndpoints.type || null);
  }, [selectedMaterial]);

  // Fetch dynamic size and type data
  const { newData: fetchedSizes } = useGet(sizeApi, sizeApi !== "");
  const { newData: fetchedTypes } = useGet(typeApi, typeApi !== "");

  // Update state when fetched data is available
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


  return (
    <Dashboard
      mainContent={
        <div className="p-6">
          {/* Page Title and Breadcrumb */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Purchase</h2>
            <p className="text-sm text-gray-500">Home &gt; Purchase</p>
          </div>

          {/* Add Purchased Orders Section */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">Add Purchased Orders</h3>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Material Name */}
                <div>
                  <label className="block text-gray-700">Material Name</label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    onChange={(e) => {
                      setSelectedMaterial(e.target.value);
                      setFormData({ ...formData, material: e.target.value });
                    }}
                    value={formData.material}
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
                  <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}>
                    {Array.isArray(colors) && colors.map((color) => (
                      <option key={color.name} value={color.name}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Size */}
                <div>
                  <label className="block text-gray-700">Size</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}>
                    {Array.isArray(sizes) && sizes.map((size) => (
                      <option key={size.name} value={size.name}>
                        {size.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-gray-700">Type</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                    {Array.isArray(types) && types.map((type) => (
                      <option key={type.name} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

              </div>


              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Quantity */}
                <div>
                  <label className="block text-gray-700">Quantity</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Price</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>

                {/* Type */}

              </div>


              {/* Buttons */}
              <div className="flex space-x-4 mt-4">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                  ADD
                </button>
                <button type="reset" className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-200">
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

export default Purchase;
