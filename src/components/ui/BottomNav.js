import React, { useEffect, useState } from "react";
import { MdHomeFilled } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import firebase from "firebase/compat/app";
import Avatar from "../modals/Avatar";

export default function BottomNav({ avatarsArray }) {
  const user = firebase.auth().currentUser.displayName;
  const [usersAvatar, setUsersAvatar] = useState();
  const [showAvatar, setShowAvatar] = useState(false);

  useEffect(() => {
    console.log("bNav rendered");
    if (avatarsArray) {
      avatarsArray.forEach((avatar) => {
        if (avatar.details.username === user) {
          return setUsersAvatar(avatar.details.imageUrl);
        }
      });
    }
  });

  return (
    <div className="fixed w-full max-w-2xl bottom-0 pb-4 bg-slate-50 border rounded-t-md">
      <div className=" flex items-center justify-between px-6 pt-4 text-2xl z-10">
        <MdHomeFilled className="z-10" />
        <FiSearch className="z-10" />
        <FiHeart className="z-10" />

        {usersAvatar ? (
          <div
            onClick={() => setShowAvatar(!showAvatar)}
            className="flex w-8 h-8 border rounded-full overflow-hidden cursor-pointer z-10"
          >
            <img
              alt="user avatar"
              className="w-full object-cover"
              src={usersAvatar}
            ></img>
          </div>
        ) : (
          <div
            onClick={() => setShowAvatar(!showAvatar)}
            className="w-6 h-6 bg-slate-600 rounded-full cursor-pointer"
          ></div>
        )}

        {showAvatar && <Avatar setShowAvatar={setShowAvatar} />}
      </div>
    </div>
  );
}
