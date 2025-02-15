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
      className={`fixed left-0 top h-screen transition-all ease-in-out ${show ? "w-72 p-2" : "w-12 p-0"
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
        <div>
          <SideBarButtons
            show={show}
            icon={<LuListOrdered />}
            onClick={() => handleSubMenu("orders")}
            arrow={showMenu.orders ? <IoIosArrowUp /> : <IoIosArrowDown />}
            btnTitle="Orders"
            isActive={checkIsActive("/app/task-management/board")}
          />
          {showMenu.orders && show && (
            <NavLink to="/app/view-orders">
              <div className="pl-6 border-l border-gray-500">
                <SubMenu icon={<LuLayoutDashboard />} btnTitle="View Orders" />

              </div>
            </NavLink>

          )}
        </div>

        <div>
          <SideBarButtons
            show={show}
            icon={<LuClipboardPlus />}
            onClick={() => handleSubMenu("products")}
            arrow={showMenu.products ? <IoIosArrowUp /> : <IoIosArrowDown />}
            btnTitle="Products"
            isActive={checkIsActive("/app/products")}
          />
          {showMenu.products && show && (
            <div className="pl-6 border-l border-gray-500">
              <SubMenu icon={<LuLayoutDashboard />} btnTitle="Add Products" />
              <SubMenu icon={<LuLayoutDashboard />} btnTitle="View Products" />
            </div>
          )}
        </div>

        {/* Fitness Tracker */}
        <div>
          <SideBarButtons
            show={show}
            icon={<LuLayoutDashboard />}
            onClick={() => handleSubMenu("fitness")}
            arrow={showMenu.fitness ? <IoIosArrowUp /> : <IoIosArrowDown />}
            btnTitle="Fitness Tracker"
            isActive={checkIsActive("/app/fitness-tracker")}
          />
          {showMenu.fitness && show && (
            <div className="pl-6 border-l border-gray-500">
              <SubMenu icon={<LuLayoutDashboard />} btnTitle="Workouts" />
              <SubMenu icon={<LuLayoutDashboard />} btnTitle="Diet Plans" />
            </div>
          )}
        </div>

        {/* Users */}
        <div>
          <SideBarButtons
            show={show}
            icon={<LuLayoutDashboard />}
            onClick={() => handleSubMenu("reports")}
            arrow={showMenu.reports ? <IoIosArrowUp /> : <IoIosArrowDown />}
            btnTitle="Users"
            isActive={checkIsActive("/app/reports")}
          />
          {showMenu.reports && show && (
            <div className="pl-6 border-l border-gray-500">
              <SubMenu icon={<LuLayoutDashboard />} btnTitle="Active Users" />
              <SubMenu icon={<LuLayoutDashboard />} btnTitle="Inactive Users" />
            </div>
          )}
        </div>

        {/* Other Static Links */}
        <NavLink to="/app/reports">
          <SideBarButtons
            icon={<LuLayoutDashboard />}
            show={show}
            btnTitle="Reports"
            isActive={checkIsActive("/app/reports")}
          />
        </NavLink>

        <NavLink to="/app/profile">
          <SideBarButtons
            icon={<LuLayoutDashboard />}
            show={show}
            btnTitle="Purchase Entry"
            isActive={checkIsActive("/app/profile")}
          />
        </NavLink>
      </div>
    </aside>
  );
}
