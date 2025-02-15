import React from "react";

export default function SideBarButtons({ icon, btnTitle, arrow, show, onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md w-full transition-all flex items-center justify-between p-2 gap-2 ${isActive
        ? "bg-[#F6A9C3] text-black" // Apply active color when isActive is true
        : "text-black hover:bg-[#F6A9C3] hover:text-black"
        }`}
    >
      <div className="flex items-center gap-2">
        {icon} {show && <span>{btnTitle}</span>}
      </div>
      {show && arrow && <span>{arrow}</span>}
    </button>

  );
}
