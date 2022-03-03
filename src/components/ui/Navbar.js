import React, { useState, useEffect, useRef } from "react";
import { CgAddR } from "react-icons/cg";
import { RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Settings from "../modals/Settings";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar({ username }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { logout } = useAuth();
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef);

  function useOutsideClick(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setSettingsOpen(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <nav className="navbar fixed flex top-0 w-full max-w-2xl px-3 py-2 justify-between items-center border rounded-b-md bg-slate-50 z-[20] select-none">
      <span className="text-4xl font-logofont">Instalike</span>
      {username}
      <div className="flex space-x-6 text-2xl">
        <Link to="/upload">
          <CgAddR className="transition-all duration-200 hover:scale-125 hover:text-neutral-400" />
        </Link>
        <RiMenuFill
          className={`z-20 transition-all duration-200 cursor-pointer hover:scale-125 hover:text-neutral-400 ${
            settingsOpen && "opacity-0 z-0"
          }`}
          onClick={() => setSettingsOpen(!settingsOpen)}
        />
      </div>
      {settingsOpen && (
        <Settings>
          <div ref={wrapperRef}>
            <li className="flex items-center p-4 space-x-2 font-sans h-14 animate-slideInTop hover:bg-slate-100">
              <IoSettingsOutline />
              <span>Settings</span>
            </li>
            <li
              onClick={logout}
              className="flex items-center p-4 space-x-2 h-14 animate-slideInTopFast hover:bg-slate-100"
            >
              <FiLogOut />
              <span>Log out</span>
            </li>
          </div>
        </Settings>
      )}
    </nav>
  );
}
