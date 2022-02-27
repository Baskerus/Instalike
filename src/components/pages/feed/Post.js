import React, { useEffect, useState, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BiBookmark } from "react-icons/bi";
import firebase from "firebase/compat/app";
import { db } from "../../../firebase";
import PostTime from "./PostTime";
import PostLikes from "../../modals/PostLikes";
import Comments from "./Comments";

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
  const [postLikes, setPostLikes] = useState(likes);
  const [user, setUser] = useState(username);
  const [postLiked, setPostLiked] = useState(false);
  const [commentsArray, setCommentsArray] = useState([]);
  const [likesModalOpen, setLikesModalOpen] = useState(false);

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
    //    v fixed the error?
    return;
  }, [user, likedBy]);

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

  function handleDeletePost() {
    db.collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Post deleted");
      })
      .catch((error) => {
        console.log("Error removing document: ", error);
      });
  }

  async function handleViewLikes() {
    setLikesModalOpen(!likesModalOpen);
  }

  return (
    <div className="relative flex flex-col w-full pb-16 my-6 text-sm border rounded-md shadow-md bg-slate-50 shadow-slate-100">
      <div className="flex items-center justify-between w-full p-4 lg:p-6">
        <div className="flex items-center justify-center space-x-2">
          <img
            src={avatar}
            className="rounded-full IMAGE bg-slate-300 w-7 h-7"
            /*   alt="user avatar" */
          />
          <span className="font-bold lowercase">{username}</span>
        </div>
        <BsThreeDotsVertical
          className="w-8 h-8 p-[.3rem] cursor-pointer text-neutral-500"
          onClick={handleDeletePost}
        />
      </div>
      <div className="relative flex items-center justify-center bg-slate-100">
        <img
          alt=""
          src={image}
          className="object-scale-down max-h-[26rem] h-full lg:max-h-[35rem] rounded-md select-none"
        ></img>
        {likesModalOpen && (
          <PostLikes likedBy={likedBy} closeModal={handleViewLikes} />
        )}
      </div>

      <div className="flex items-center justify-between w-full px-4 py-3 text-2xl lg:px-6">
        <div className="flex space-x-6">
          {postLiked ? (
            <FaHeart
              className="text-red-600 cursor-pointer"
              onClick={handleLike}
            />
          ) : (
            <FiHeart className="cursor-pointer" onClick={handleLike} />
          )}
          <IoPaperPlaneOutline />
        </div>
        <BiBookmark />
      </div>

      <div className="flex flex-col px-4 select-none lg:px-6">
        <div onClick={handleViewLikes} className="font-bold cursor-pointer">
          {postLikes !== 0 ? postLikes : "No"}{" "}
          {postLikes === 1 ? "like" : "likes"}
        </div>
        <div className="flex">
          <a href="/" className="mr-1 font-bold lowercase ">
            {username}
          </a>
          <div className="break-word max-w-[40ch] md:max-w-[75ch] mb-1">
            {description}
          </div>
        </div>
        <div className="mb-2 ml-3">
          <Comments id={id} setCommentsArray={setCommentsArray} />
          {commentsArray.map((comment, index) => {
            return (
              <div key={index} className="flex COMMENT">
                <a href="/" className="mr-1 font-bold lowercase">
                  {comment.user}
                </a>
                <div className="break-word">{comment.content}</div>
              </div>
            );
          })}
        </div>

        <PostTime timestamp={timestamp} />
      </div>
    </div>
  );
}
