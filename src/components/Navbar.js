import React from "react";
import { CgAddR } from "react-icons/cg";
import { RiMessengerLine } from "react-icons/ri";

export default function Navbar({ signedIn, setSignInOpen }) {
  return (
    <nav className="fixed flex w-full p-2 px-4 justify-between items-center bg-slate-50 z-10">
      <span className="font-logofont text-4xl">Instaclone</span>
      <p>{signedIn ? "LOGGED IN" : "LOGGED OUT"}</p>
      {signedIn ? (
        <div className="flex text-2xl space-x-6">
          <CgAddR />
          <RiMessengerLine />
        </div>
      ) : (
        <a
          onClick={() => setSignInOpen(true)}
          className="text-sm font-bold text-blue-700"
        >
          Sign In
        </a>
      )}
    </nav>
  );
}
