import React from "react";

export default function AddStory() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 min-w-[4rem] p-1 mb-1">
        <div className="w-full h-full bg-slate-300 rounded-full"></div>
        <div className="flex absolute right-0 bottom-0 w-6 h-6 items-center justify-center text-white  rounded-full">
          <div className="flex items-center justify-center w-full h-full bg-blue-400 border-white border-2 rounded-full text-center text-lg">
            +
          </div>
        </div>
      </div>
      <div className="text-xs">
        Your story
      </div>
    </div>
  );
}
