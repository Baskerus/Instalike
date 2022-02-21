import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BiBookmark } from "react-icons/bi";
import { faker } from "@faker-js/faker";

export default function Post() {
  const userName = faker.internet.userName();

  return (
    <div className="flex flex-col text-sm mt-2">
      <div className="flex w-full justify-between items-center p-4">
        <div className="flex items-center justify-center space-x-2">
          <img
            src={faker.internet.avatar()}
            className="IMAGE rounded-full bg-slate-300 w-7 h-7"
          />
          <span className="font-bold lowercase">{userName}</span>
        </div>
        <BsThreeDotsVertical className="text-neutral-500" />
      </div>

      <img
        src={faker.image.abstract(640, 480, true)}
        className="IMAGE bg-slate-200 h-72 object-contain"
      ></img>

      <div className="flex w-full px-4 py-3 items-center justify-between text-2xl">
        <div className="flex space-x-6">
          <FiHeart />
          <IoPaperPlaneOutline />
        </div>
        <BiBookmark />
      </div>

      <div className="flex flex-col px-4">
        <div className="font-bold">
          {faker.random.number({ max: 100 })} likes
        </div>
        <div>
          <b className="lowercase">{userName}</b> Lorem ipsum dolor sit amet
          consetur adipisicing elit. Sit amet dolor sit..
        </div>
        <div className="text-xs text-neutral-400 pt-1">29 minutes ago</div>
      </div>
    </div>
  );
}
