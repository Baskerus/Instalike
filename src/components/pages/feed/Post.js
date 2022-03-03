import React, { useEffect, useState, useRef } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { MdReportGmailerrorred } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BiBookmark } from "react-icons/bi";
import firebase from "firebase/compat/app";
import { db } from "../../../firebase";
import PostTime from "./PostTime";
import PostLikes from "../../modals/PostLikes";
import Comments from "./Comments";
import Settings from "../../modals/Settings";

export default function Post({
  username,
  image,
  description,
  likes,
  timestamp,
  id,
  likedBy,
  comments,
  avatarsArray,
}) {
  const [postLikes, setPostLikes] = useState(likes);
  const [user, setUser] = useState(username);
  const [postLiked, setPostLiked] = useState(false);
  const [likesModalOpen, setLikesModalOpen] = useState(false);
  const [usersAvatar, setUsersAvatar] = useState();
  const wrapperRef = useRef(null);
  const currentUser = firebase.auth().currentUser.displayName;
  useOutsideClick(wrapperRef);

  function useOutsideClick(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

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
    return () => {
      setUser("");
      setPostLiked(false);
    };
  }, [user, likedBy]);

  useEffect(() => {
    if (avatarsArray) {
      avatarsArray.forEach((avatar) => {
        if (avatar.details.username === user) {
          if (user === username) {
            setUsersAvatar(avatar.details.imageUrl);
          } else return;
        }
      });
    }
    return;
  }, [avatarsArray, user, username]);

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
    if (window.confirm("Are you sure you want to delete the post?")) {
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
  }

  async function handleViewLikes() {
    setLikesModalOpen(!likesModalOpen);
  }

  function handlePrompt() {
    alert("Oops! Feature not yet implemented.");
  }

  return (
    <div className="relative flex flex-col w-full pb-16 my-6 text-sm transition-none duration-200 border rounded-md shadow-md bg-slate-50 shadow-slate-100">
      <div className="flex items-center justify-between w-full p-4 lg:p-6 z-[20]">
        <div className="flex items-center justify-center space-x-2">
          <div className="z-10 flex w-8 h-8 overflow-hidden border rounded-full cursor-pointer">
            {usersAvatar ? (
              <img
                alt="user avatar"
                className="object-cover w-full"
                src={usersAvatar}
              ></img>
            ) : (
              <span className="flex items-center justify-center w-full h-full text-xl uppercase">
                {username.charAt(0)}
              </span>
            )}
          </div>
          <span className="font-bold lowercase">{username}</span>
        </div>
        <div ref={wrapperRef}>
          {username === currentUser && (
            <MdDeleteOutline
              onClick={handleDeletePost}
              className="w-9 h-9 p-1 cursor-pointer text-slate-700 hover:text-neutral-500 hover:scale-110 transition-all duration-200"
            />
          )}
        </div>
      </div>
      <div className="relative flex items-center justify-center bg-slate-50">
        <img
          alt=""
          src={image}
          className="object-scale-down max-h-[26rem] h-full lg:max-h-[35rem] rounded-md select-none"
        ></img>
        {likesModalOpen && (
          <PostLikes likedBy={likedBy} closeModal={handleViewLikes} />
        )}
      </div>

      <div className="flex items-center justify-between w-full  px-4 py-3 text-2xl lg:px-6">
        <div className="flex space-x-6 ">
          {postLiked ? (
            <div
              onClick={handleLike}
              className="flex items-center justify-center w-6 h-6"
            >
              <FaHeart className="text-red-600 transition-all duration-200 cursor-pointer md:hover:scale-125 md:hover:text-red-200" />
            </div>
          ) : (
            <FiHeart
              className="transition-all duration-200 cursor-pointer md:hover:scale-125 md:hover:text-red-600"
              onClick={handleLike}
            />
          )}
          <IoPaperPlaneOutline onClick={handlePrompt} />
        </div>
        <BiBookmark onClick={handlePrompt} />
      </div>

      <div className="flex flex-col px-4 select-none lg:px-6">
        <div
          onClick={handleViewLikes}
          className="font-bold cursor-pointer w-16"
        >
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
          <Comments id={id} comments={comments} />
        </div>

        <PostTime timestamp={timestamp} />
      </div>
    </div>
  );
}
