import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";

function Settings() {
  const { logout } = useAuth();
  return (
    <ul className="absolute top-0 right-0 w-56 border shadow-md cursor-pointer bg-slate-50 rounded-b-md text-md animate-slideInTop ">
      <li className="flex items-center p-4 space-x-2 font-sans border-b h-14 animate-slideInTop">
        <IoSettingsOutline />
        <span>Settings</span>
      </li>
      <li
        onClick={logout}
        className="flex items-center p-4 space-x-2 h-14 animate-slideInTopFast"
      >
        <FiLogOut />
        <span>Log out</span>
      </li>
    </ul>
  );
}

export default Settings;
