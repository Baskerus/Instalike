import React from "react";

function Settings({ children, top, borderL }) {
  return (
    <ul
      className={`absolute top-${top} right-0 z-20 w-56 cursor-pointer border border-t-0 border-l-${borderL} bg-slate-50 rounded-b-md text-md animate-slideInTop overflow-hidden`}
    >
      {children}
    </ul>
  );
}

export default Settings;
