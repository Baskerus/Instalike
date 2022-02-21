import React from "react";
import {
  MdHomeFilled,
  MdOutlineVideoLibrary,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { GoThreeBars } from "react-icons/go";
import { HiOutlineChevronLeft } from "react-icons/hi";

export default function () {
  return (
    <div className="fixed w-full bottom-0 pb-4 bg-slate-50 z-10">
      <div className=" flex items-center justify-between p-6 pt-4 text-2xl">
        <MdHomeFilled />
        <FiSearch />
        <MdOutlineVideoLibrary />
        <FiHeart />
        <div className="IMAGE w-6 h-6 rounded-full bg-slate-300"></div>
      </div>

      <div className="flex items-center justify-between px-16 text-lg text-neutral-500">
        <GoThreeBars className="rotate-90" />
        <MdCheckBoxOutlineBlank />
        <HiOutlineChevronLeft className="text-xl" />
      </div>
    </div>
  );
}
