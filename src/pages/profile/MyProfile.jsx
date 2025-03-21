import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/ContextApp";
import { baseUrl } from "../../constant/base.url";
import { FaEdit } from "react-icons/fa";
import useFormPost from "../../customHooks/useFormPost";
import usePostProfile from "../../customHooks/usePostProfile";
import usePut from "../../customHooks/usePut";

const MyProfile = () => {
  const { user, showToast, isLoading } = useContext(AppContext);
  const [profilePic, setProfilePic] = useState("");
  const [fullName, setFullName] = useState(user?.full_name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [phone, setPhone] = useState(user?.phone_number || "");
  const [address, setAddress] = useState(user?.address || "");
  const [loading, setLoading] = useState(false);
  // Initialize hook inside the component
  const formPost = usePostProfile("user/update-profile-icon/");
  const formPut = usePut("user/update-profile/");


  useEffect(() => {
    if (user) {
      setProfilePic(`${baseUrl}${user.profile_pic}`);
      setFullName(user.full_name);
      setUsername(user.username);
      setPhone(user.phone_number);
      setAddress(user.address);

    }
  }, [user]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setLoading(true);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);

      const formData = new FormData();
      formData.append("profile_pic", file);

      const profile = await formPost.save(formData); // Use formPost properly
      if (profile) {
        setLoading(false);
        showToast("Profile picture updated successfully", "success");
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { full_name: fullName, username: username, phone_number: phone, address: address };
    const check = formPut.update(formData);
    if (check) {
      showToast("Profile updated successfully", "success");
      window.location.reload();

    }

  }

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Welcome, {user?.username}</h2>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-6 relative">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={profilePic || "/default-profile.png"}
              alt="profile"
              className="w-20 h-20 rounded-full border"
            />
            {/* Edit Icon */}
            <label htmlFor="profilePicInput">
              <FaEdit className="absolute bottom-0 right-0 bg-gray-300 p-1 rounded-full cursor-pointer text-gray-700" size={20} />
            </label>
            <input
              type="file"
              id="profilePicInput"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold">{user?.full_name}</h3>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <label className="text-gray-600">Full Name</label>
            <input
              type="text"
              value={fullName}
              placeholder="Your Full Name"
              className="border w-full p-2 rounded-md mt-1"
              onChange={(e) => setFullName(e.target.value)}

            />
          </div>
          <div>
            <label className="text-gray-600">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)
              }
              placeholder="Your Username"
              className="border w-full p-2 rounded-md mt-1"
            />
          </div>
          <div>
            <label className="text-gray-600">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)
              }
              placeholder="Your Phone Number"
              className="border w-full p-2 rounded-md mt-1"
            />
          </div>
          <div>
            <label className="text-gray-600">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)
              }
              placeholder="Your Address"
              className="border w-full p-2 rounded-md mt-1"
            />
          </div>
        </div>

        {/* Update Button */}
        <div className="flex justify-end mt-6">
          <button className="bg-pink-400 text-white px-6 py-2 rounded-md" onClick={(e) => handleSubmit(e)}>
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
