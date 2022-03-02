import React from "react";

function Settings({ children }) {
  return (
    <ul className="absolute top-0 right-0 z-[11] w-56 border cursor-pointer bg-slate-50 rounded-b-md text-md animate-slideInTop">
      {children}
    </ul>
  );
}

export default Settings;
