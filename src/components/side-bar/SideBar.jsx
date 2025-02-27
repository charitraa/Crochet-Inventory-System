import { useContext, useState } from "react";
import { LuClipboardPlus, LuLayoutDashboard, LuListOrdered } from "react-icons/lu";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import SideBarButtons from "./SideBarButtons";
import SubMenu from "./SubMenu";
import "../../styles/sub-menu.css";
import { AppContext } from "../../context/ContextApp";

export default function SideBar() {
  const { responsive, setResponsive } = useContext(AppContext);
  const [show, setShow] = useState(true);
  const [showMenu, setShowMenu] = useState({
    orders: false,
    reports: false,
    products: false,
    materials: false,
  });
  const location = useLocation();

  const handleSubMenu = (key) => {
    setShowMenu((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleClose = () => {
    setShow(!show);
    setResponsive(!responsive);
  };

  const checkIsActive = (path) => location.pathname === path;

  return (
    <aside
      style={{ background: "#FACFDD", zIndex: "1000" }}
      className={`fixed left-0 top-18.5 h-[calc(100vh-4rem)] transition-all ease-in-out ${show ? "w-72 p-2" : "w-12 p-0"
        } flex flex-col`}
    >


      <nav className="mt-2 p-2 flex justify-between items-center text-black">
        <button
          onClick={handleClose}
          className="bg-slate-800 w-8 h-7 transition-all rounded-md ease-in-out flex justify-center items-center hover:bg-slate-400 hover:text-black"
        >
          {show ? <FaArrowLeft color="white" /> : <FaArrowRight color="white" />}
        </button>
      </nav>

      <div className="p-2 mt-6 flex flex-col gap-4">
        <NavLink to="/app/dashboard">
          <SideBarButtons
            icon={<LuLayoutDashboard />}
            show={show}
            btnTitle="Dashboard"
            isActive={checkIsActive("/app/dashboard")}
          />
        </NavLink>

        {/* Orders */}
        <NavLink to="/app/orders">
          <SideBarButtons
            show={show}
            icon={<LuListOrdered />}
            onClick={() => handleSubMenu("orders")}
            btnTitle="Orders"
            isActive={checkIsActive("/app/orders")}
          />
        </NavLink>

        <NavLink to="/app/products">
          <SideBarButtons
            show={show}
            icon={<LuClipboardPlus />}
            onClick={() => handleSubMenu("products")}
            btnTitle="Products"
            isActive={checkIsActive("/app/products")}
          />
        </NavLink>

        <NavLink to="/app/materials">
          <SideBarButtons
            show={show}
            icon={<LuLayoutDashboard />}
            onClick={() => handleSubMenu("Materials")}
            btnTitle="Materials"
            isActive={checkIsActive("/app/materials")}
          />
        </NavLink>

        <NavLink to="/app/users">
          <SideBarButtons
            show={show}
            icon={<LuLayoutDashboard />}
            onClick={() => handleSubMenu("Users")}
            btnTitle="Users"
            isActive={checkIsActive("/app/users")}
          />
        </NavLink>


        <NavLink to="/app/admins">
          <SideBarButtons
            icon={<LuLayoutDashboard />}
            show={show}
            btnTitle="Admins"
            isActive={checkIsActive("/app/admins")}
          />
        </NavLink>

        {/* Other Static Links */}
        <NavLink to="/app/reports">
          <SideBarButtons
            icon={<LuLayoutDashboard />}
            show={show}
            btnTitle="Reports"
            isActive={checkIsActive("/app/reports")}
          />
        </NavLink>

        <NavLink to="/app/purchase">
          <SideBarButtons
            icon={<LuLayoutDashboard />}
            show={show}
            btnTitle="Purchase"
            isActive={checkIsActive("/app/purchase")}
          />
        </NavLink>

        <NavLink to="/app/inbox">
          <SideBarButtons
            icon={<LuLayoutDashboard />}
            show={show}
            btnTitle="Inbox"
            isActive={checkIsActive("/app/inbox")}
          />
        </NavLink>
      </div>
    </aside>
  );
}
