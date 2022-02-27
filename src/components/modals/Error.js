import React from "react";
import { MdClose } from "react-icons/md";

function Error({ error, setShowError }) {
  return (
    <div className="fixed flex items-center justify-center w-screen h-screen top-0 left-0 ">
      <div className="flex flex-col relative  w-full max-w-xs p-4 bg-slate-50 shadow-lg z-10 rounded-lg ">
        <div className="flex justify-center items-center w-full border-b pb-2 text-red-800">
          ERROR
        </div>
        <MdClose
          onClick={() => {
            setShowError(false);
          }}
          className="absolute top-0 right-0 w-8 h-8 p-1 text-slate-500 cursor-pointer z-10"
        />
        <span className="pt-4 text-center">{error}</span>
      </div>
    </div>
  );
}

export default Error;
