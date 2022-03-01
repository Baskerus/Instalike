import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";

function Settings() {
  const { logout } = useAuth();
  return (
    <ul className="absolute top-0 right-0 w-48 border bg-slate-50 rounded-b-md text-md cursor-pointer animate-slideInTop">
      <li className="flex items-center h-10 p-4 space-x-2 font-sans"></li>
      <li className="flex items-center h-14 p-4 space-x-2 border-b font-sans animate-slideInTop">
        <IoSettingsOutline />
        <span>Settings</span>
      </li>
      <li
        onClick={logout}
        className="flex items-center h-14 p-4 space-x-2 animate-slideInTopFast"
      >
        <FiLogOut />
        <span>Log out</span>
      </li>
    </ul>
  );
}

export default Settings;
