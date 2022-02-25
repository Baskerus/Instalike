import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";


export default function BottomNav() {


  return (
    <div className="fixed w-full max-w-2xl bottom-0 pb-4 bg-slate-50 z-10">
      <div className=" flex items-center justify-between px-6 pt-4 text-2xl">
        <MdHomeFilled />
        <FiSearch />
        <FiHeart />
        <Link
          to="/user-profile"
          className="IMAGE w-6 h-6 rounded-full bg-slate-300"
      
        ></Link>
      </div>
    </div>
  );
}
