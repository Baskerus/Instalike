import React from "react";

function Settings({ children }) {
  return (
    <ul
      className={`SETT absolute top-[56px] right-0 z-20 w-56 cursor-pointer border border-t-0 border-l-0 bg-slate-50 rounded-b-md text-md animate-slideInTop overflow-hidden`}
    >
      {children}
    </ul>
  );
}

export default Settings;
