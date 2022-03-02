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
    if (avatarsArray) {
      avatarsArray.forEach((avatar) => {
        if (avatar.details.username === user) {
          return setUsersAvatar(avatar.details.imageUrl);
        }
      });
    }
  }, [avatarsArray, user]);

  return (
    <div className="fixed w-full max-w-2xl bottom-0 pb-4 bg-slate-50 border rounded-t-md z-[20]">
      <div className="z-10 flex items-center justify-between px-6 pt-4 text-2xl ">
        <MdHomeFilled className="z-10" />
        <FiSearch className="z-10" />
        <FiHeart className="z-10" />
        <div className="z-10 flex w-8 h-8 overflow-hidden border rounded-full cursor-pointer">
          {usersAvatar ? (
            <div
              onClick={() => setShowAvatar(!showAvatar)}
              className="z-10 flex w-8 h-8 overflow-hidden border rounded-full cursor-pointer select-none"
            >
              <img
                alt="user avatar"
                className="object-cover w-full select-none"
                src={usersAvatar}
              ></img>
            </div>
          ) : (
            <span
              onClick={() => setShowAvatar(!showAvatar)}
              className="z-10 flex items-center justify-center w-full h-full text-xl uppercase select-none"
            >
              {user && user.charAt(0)}
            </span>
          )}
        </div>
        {showAvatar && (
          <Avatar setShowAvatar={setShowAvatar} avatarsArray={avatarsArray} />
        )}
      </div>
    </div>
  );
}
