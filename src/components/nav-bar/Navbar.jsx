import { useContext, useState } from "react";
import { Bell, Search } from "lucide-react";
import { AppContext } from "../../context/ContextApp";
import { NavLink, useNavigate } from "react-router-dom";


export default function TopNavbar() {
  const [notifications, setNotifications] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AppContext)
  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const handlelogout = () => {
    // Implement logout logic here
    localStorage.removeItem("access_token");
    navigate("/");
    setIsAuthenticated(false);
  }

  return (
    <nav
      style={{ backgroundColor: "#FFC0D4" }}
      className="fixed top-0 left-0 w-full z-50 p-4 flex items-center justify-between shadow-md"
    >

      {/* Logo */}
      <div className="text-black font-semibold text-lg">Logo Here</div>

      {/* Search Bar */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search here"
          className="w-full p-1 pr-3 pl-3 rounded-lg placeholder-gray-500 text-gray-500 border-2 border-gray-500 outline-none focus:outline-none focus:ring-0 focus:border-gray-500"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
      </div>

      {/* Notification & Profile */}
      <div className="flex items-center space-x-6">
        {/* Notification Bell */}
        <div className="relative">
          <Bell className="text-gray-700 cursor-pointer" size={22} />
          {notifications > 0 && (
            <span className="absolute -top-2 right-1 bg-red-500 text-white text-[10px] rounded-full px-2">
              {notifications}
            </span>

          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleDropdown} // Toggle dropdown on click
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-black font-semibold">
              {user ? user.profile_pic : "A"}
            </div>
            <span className="text-black font-medium">{user ? user.full_name : "Unknown"}</span>
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg w-48 p-2">
              <ul className="space-y-2">
                <li>
                  <a onClick={() => navigate('/app/myprofile')}
                    className="block px-4 py-2 text-black hover:bg-gray-100 rounded-md"
                  >
                    View Profile
                  </a>

                </li>
                <li>
                  <a onClick={() => handlelogout()}
                    className="block px-4 py-2 text-black hover:bg-gray-100 rounded-md"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav >
  );
}
