import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BiBookmark } from "react-icons/bi";
import firebase from "firebase/compat/app";

export default function Post({
  username,
  avatar,
  image,
  description,
  likes,
  timestamp,
  id,
  likedBy,
}) {
  const [postTime, setPostTime] = useState("");
  const [postLikes, setPostLikes] = useState(likes);
  const [user, setUser] = useState(username);
  const [postLiked, setPostLiked] = useState(false);

  useEffect(() => {
    // Checks if user has already liked the post
    if (likedBy.includes(user)) {
      setPostLiked(true);
    } else {
      setPostLiked(false);
    }

    // Gets currently logged in user's username
    if (firebase.auth().currentUser) {
      setUser(firebase.auth().currentUser.displayName);
    }

    // Calculates post age
    if (timestamp) {
      let postDate = timestamp.toDate();
      let currentDate = Math.round(new Date().getTime() / 1000);
      postDate = Math.round(postDate.getTime() / 1000);
      let dateDiff = currentDate - postDate;

      let h = Math.floor(dateDiff / 3600);
      let m = Math.floor((dateDiff % 3600) / 60);
      /*       let s = Math.floor((dateDiff % 3600) % 60); */

      let hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
      let mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
      // Decided not to use seconds ---- let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";

      // Displays the time since post was uploaded
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
    } else return;
    //    v fixed the error?
    return;
  }, [user, likedBy, timestamp]);

  function handleLike() {
    let db = firebase.firestore();

    if (likedBy.includes(user)) {
      let arrWithUserRemoved = likedBy.filter((element) => element !== user);

      db.collection("posts")
        .doc(id)
        .update({ likes: likes - 1, likedBy: arrWithUserRemoved })
        .then(setPostLikes(likes - 1))
        .then(setPostLiked(false));
    } else {
      db.collection("posts")
        .doc(id)
        .update({ likes: likes + 1, likedBy: [...likedBy, user] })
        .then(setPostLikes(likes + 1))
        .then(setPostLiked(true));
    }
  }

  return (
    <div className="flex flex-col text-sm mt-2">
      <div className="flex w-full justify-between items-center p-4">
        <div className="flex items-center justify-center space-x-2">
          <img
            src={avatar}
            className="IMAGE rounded-full bg-slate-300 w-7 h-7"
            alt="user avatar"
          />
          <a href="/" className="font-bold lowercase">
            {username}
          </a>
        </div>
        <BsThreeDotsVertical className="text-neutral-500" />
      </div>

      <img
        alt=""
        src={image}
        className="bg-slate-200 max-h-[26rem] h-full object-scale-down select-none"
      ></img>

      <div className="flex w-full px-4 py-3 items-center justify-between text-2xl">
        <div className="flex space-x-6">
          {postLiked ? (
            <FaHeart className="text-red-600" onClick={handleLike} />
          ) : (
            <FiHeart onClick={handleLike} />
          )}
          <IoPaperPlaneOutline />
        </div>
        <BiBookmark />
      </div>

      <div className="flex flex-col px-4 select-none">
        <div className="font-bold">
          {postLikes !== 0 ? postLikes : "No"}{" "}
          {postLikes === 1 ? "like" : "likes"}
        </div>
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
