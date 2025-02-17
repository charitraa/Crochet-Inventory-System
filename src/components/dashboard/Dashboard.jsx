import { useContext } from "react";
import SideBar from "../side-bar/SideBar";
import { AppContext } from "../../context/ContextApp";
import Navbar from "../nav-bar/Navbar"
export default function Dashboard({ mainContent }) {
  const { responsive } = useContext(AppContext);
  return (
    <>
  <Navbar />
  <div className="flex pt-16"> {/* Adjust padding to prevent content from overlapping the navbar */}
    <SideBar />
    <div
      className={`flex-1 overflow-y-auto p-4 ${responsive ? "md:ml-72" : "ml-12"}`}
      style={{ height: "calc(100vh - 4rem)" }} 
    >
      {mainContent}
    </div>
  </div>
</>

  );
}
