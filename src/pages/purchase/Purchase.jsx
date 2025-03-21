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
  const [sizeApi, setSizeApi] = useState("");
  const [typeApi, setTypeApi] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const check = await save(); // Pass correct data
    if (check) {
      setFormData({ material: "", color: "", size: "", type: "", quantity: "", price: "" });
      showToast("Product saved successfully", "success");
    }
  };


  useEffect(() => {
    if (selectedMaterial) {
      let sizeEndpoint = "";
      let typeEndpoint = "";

      switch (selectedMaterial) {
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
  }, [selectedMaterial]);

  // Fetch dynamic size and type data
  const { newData: fetchedSizes } = useGet(sizeApi, sizeApi !== "");
  const { newData: fetchedTypes } = useGet(typeApi, typeApi !== "");

  // Update state when fetched data is available
  useEffect(() => {
    setSizes(fetchedSizes?.length ? fetchedSizes : [{ name: "None" }]);
  }, [fetchedSizes]);

  useEffect(() => {
    setTypes(fetchedTypes?.length ? fetchedTypes : [{ name: "None" }]);
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
                    {materials?.map((mat) => (
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
                    {colors?.map((color) => (
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
                    {sizes?.map((size) => (
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
                    {types?.map((type) => (
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
