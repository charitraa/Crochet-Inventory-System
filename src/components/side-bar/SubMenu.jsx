import React from 'react'

export default function SubMenu({ icon, btnTitle }) {
  return (
    <button className="rounded-md  text-black w-full hover:bg-[#F6A9C3] transition-all hover:text-black flex items-center p-2 gap-2">
      {icon} <span>{btnTitle}</span>

    </button>)
}
