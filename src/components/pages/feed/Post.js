import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BiBookmark } from "react-icons/bi";
import { CgOptions } from "react-icons/cg";

export default function Post({
  username,
  avatar,
  image,
  description,
  likes,
  timestamp,
}) {
  const [postTime, setPostTime] = useState("");

  useEffect(() => {
    let postDate = timestamp.toDate();
    let currentDate = Math.round(new Date().getTime() / 1000);
    postDate = Math.round(postDate.getTime() / 1000);
    let dateDiff = currentDate - postDate;

    let h = Math.floor(dateDiff / 3600);
    let m = Math.floor((dateDiff % 3600) / 60);
    let s = Math.floor((dateDiff % 3600) % 60);

    let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    let mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
   // Decided not to use seconds ---- let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";

// Displays the time since post was uploaded ("4 minutes ago, 18 hours ago, 5 day ago, etc...")

    if (dateDiff < 3600) {
      setPostTime(mDisplay + " ago");
    } else if (h < 24) {
      setPostTime(hDisplay + " ago");
    } else if (h <= 720) {
      let daysAgo = Math.round(h / 24);
      setPostTime(daysAgo + ` day${daysAgo > 1 ? "s" : ""} ago`);
    } else if (h > 720) {
      let options = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      setPostTime(timestamp.toDate().toLocaleDateString("en-GB", options));
    }
  }, []);

  function handleLike(){
    
  }

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
          <FiHeart onClick={handleLike}/>
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
        <div className="text-xs text-neutral-400 pt-1">{postTime}</div>
      </div>
    </div>
  );
}
