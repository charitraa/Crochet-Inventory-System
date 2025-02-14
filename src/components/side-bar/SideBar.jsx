import { useContext, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
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
  const [showMenu, setSubMenu] = useState({
    task: false,
    reports: false,
    expense: false,
    fitness: false,
  });
  const location = useLocation();

  const handleSubMenu = (value) => {
    setSubMenu((prevState) => ({
      ...prevState,
      [value]: !prevState[value],
    }));
  };

  const handleClose = () => {
    setShow(!show);
    setResponsive(!responsive);
  };

  const checkIsActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside
      style={{ background: "#FACFDD", zIndex: "1000" }}
      className={`fixed left-0 top h-screen transition-all ease-in-out ${
        show ? "w-72 p-2" : "w-12 p-0"
      } flex flex-col`}
    >
      <nav className="mt-2 p-2 flex justify-between items-center text-black">
        {show && <h1>Crochet</h1>}
        <button
          onClick={handleClose}
          className="bg-slate-800 w-8 h-7 transition-all rounded-md ease-in-out flex justify-center items-center hover:bg-slate-400 hover:text-black"
        >
          {show ? <FaArrowLeft color="white" /> : <FaArrowRight color="white"  />}
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
        <div className="flex flex-col gap-2">
          <NavLink to="/app/task-management/board">
            <SideBarButtons
              show={show}
              icon={<LuLayoutDashboard />}
              onClick={() => handleSubMenu("task")}
              arrow={showMenu.task ? <IoIosArrowUp /> : <IoIosArrowDown />}
              btnTitle="Orders"
              isActive={checkIsActive("/app/task-management/board")}
            />
          </NavLink>
          {/* <div className={`open ${showMenu.task && show ? "click" : ""}`}>
            <div className="px-4 py-1">
              <ul className="border-l flex flex-col gap-4 border-slate-700 px-4">
                <SubMenu icon={<LuLayoutDashboard />} btnTitle="Boards" />
                <SubMenu icon={<LuLayoutDashboard />} btnTitle="Doing" />
                <SubMenu icon={<LuLayoutDashboard />} btnTitle="Completed" />
              </ul>
            </div>
          </div> */}

          <NavLink to="/app/expense-tracker">
            <SideBarButtons
              show={show}
              icon={<LuLayoutDashboard />}
              onClick={() => handleSubMenu("Products")}
              arrow={showMenu.expense ? <IoIosArrowUp /> : <IoIosArrowDown />}
              btnTitle="Expense Tracker"
              isActive={checkIsActive("/app/expense-tracker")}
            />
          </NavLink>

          <NavLink to="/app/fitness-tracker">
            <SideBarButtons
              show={show}
              icon={<LuLayoutDashboard />}
              onClick={() => handleSubMenu("Materials")}
              arrow={showMenu.fitness ? <IoIosArrowUp /> : <IoIosArrowDown />}
              btnTitle="Fitness Tracker"
              isActive={checkIsActive("/app/fitness-tracker")}
            />
          </NavLink>

          <NavLink to="/app/reports">
            <SideBarButtons
              show={show}
              icon={<LuLayoutDashboard />}
              onClick={() => handleSubMenu("reports")}
              arrow={showMenu.reports ? <IoIosArrowUp /> : <IoIosArrowDown />}
              btnTitle="Users"
              isActive={checkIsActive("/app/reports")}
            />
          </NavLink>

          <NavLink to="/app/profile">
            <SideBarButtons
              icon={<LuLayoutDashboard />}
              show={show}
              btnTitle="Reports"
              isActive={checkIsActive("/app/profile")}
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
      </div>
      <div
        className={`text-black border-t border-slate-800 flex items-center gap-3 ${
          show ? "p-2" : "p-2"
        } mt-auto`}
      >
       
        {show && (
          <div>
            <h2> Takri</h2>
            
          </div>
        )}
      </div>
    </aside>
  );
}
