import React from "react";
import { CgAddR } from "react-icons/cg";
import { RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Navbar({ username }) {
  return (
    <nav className="fixed flex w-full p-2 px-4 justify-between items-center bg-slate-50 z-10">
      <span className="font-logofont text-4xl">Instaclone</span>
      {username}
      <div className="flex text-2xl space-x-6">
        <Link to="/upload">
          <CgAddR />
        </Link>
        <RiMenuFill />
      </div>
    </nav>
  );
}
