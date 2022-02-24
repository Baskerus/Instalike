import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function BottomNav() {
  const { logout } = useAuth();

  return (
    <div className="fixed w-full bottom-0 pb-4 bg-slate-50 z-10">
      <div className=" flex items-center justify-between px-6 pt-4 text-2xl">
        <MdHomeFilled />
        <FiSearch />
        <FiHeart />
        <Link
          to="/sign-in"
          className="IMAGE w-6 h-6 rounded-full bg-slate-300"
          onClick={logout}
        ></Link>
      </div>
    </div>
  );
}
