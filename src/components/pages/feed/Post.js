import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BiBookmark } from "react-icons/bi";

export default function Post({ username, avatar, image, description, likes }) {
  return (
    <div className="flex flex-col text-sm mt-2">
      <div className="flex w-full justify-between items-center p-4">
        <div className="flex items-center justify-center space-x-2">
          <img
            src={avatar}
            className="IMAGE rounded-full bg-slate-300 w-7 h-7"
          />
          <a href="/" className="font-bold lowercase">
            {username}
          </a>
        </div>
        <BsThreeDotsVertical className="text-neutral-500" />
      </div>

      <img
        src={image}
        className="IMAGE bg-slate-200 max-h-[26rem] h-full object-scale-down"
      ></img>

      <div className="flex w-full px-4 py-3 items-center justify-between text-2xl">
        <div className="flex space-x-6">
          <FiHeart />
          <IoPaperPlaneOutline />
        </div>
        <BiBookmark />
      </div>

      <div className="flex flex-col px-4">
        <div className="font-bold">{likes} likes</div>
        <div>
          <a href="/" className="lowercase font-bold mr-1">
            {username}
          </a>
          {description}
        </div>
        <div className="text-xs text-neutral-400 pt-1">29 minutes ago</div>
      </div>
    </div>
  );
}
