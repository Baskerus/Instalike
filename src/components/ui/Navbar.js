import React, { useState } from "react";
import { CgAddR } from "react-icons/cg";
import { RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Settings from "../modals/Settings";
import { MdClose } from "react-icons/md";

export default function Navbar({ username }) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <nav className="navbar fixed flex top-0 w-full max-w-2xl px-3 py-2 justify-between items-center border rounded-b-md bg-slate-50 z-[20] select-none">
      <span className="font-logofont text-4xl">Instalike</span>
      {username}
      <div className="flex text-2xl space-x-6">
        <Link to="/upload">
          <CgAddR />
        </Link>
        {settingsOpen ? (
          <MdClose
            className="z-20 cursor-pointer text-2xl"
            onClick={() => setSettingsOpen(!settingsOpen)}
          />
        ) : (
          <RiMenuFill
            className="z-20 cursor-pointer"
            onClick={() => setSettingsOpen(!settingsOpen)}
          />
        )}
      </div>
      {settingsOpen && <Settings />}
    </nav>
  );
}
