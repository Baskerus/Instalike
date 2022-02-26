import React, { useEffect, useState, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BiBookmark } from "react-icons/bi";
import firebase from "firebase/compat/app";
import { db } from "../../../firebase";

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
  const currentUser = firebase.auth().currentUser.displayName;

  const [postTime, setPostTime] = useState("");
  const [postLikes, setPostLikes] = useState(likes);
  const [user, setUser] = useState(username);
  const [postLiked, setPostLiked] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [commentsArray, setCommentsArray] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [addedComment, setAddedComment] = useState();
  const [time, setTime] = useState(Date.now());
  const textarea = useRef();

  // Fix this with a component?
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);

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
        if (mDisplay < 1) {
          setPostTime("Just a moment ago.");
        } else setPostTime(mDisplay + " ago");
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
    } else
      return () => {
        clearInterval(interval);
      };
  }, [time]);

  useEffect(() => {
    // Gets data from the "comment" collection inside "posts"
    // and stores them in commentsArray                                                  REVISIT THIS !!!!!!!!!!!!

    if (commentsLoaded) {
      return;
    }
    db.collection("posts")
      .doc(id)
      .collection("comments")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setCommentsArray((commentsArray) => [...commentsArray, doc.data()]);
          setCommentsLoaded(true);
        });
      });
    setAddedComment("");
  }, []);

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
  }, [user, likedBy, timestamp]);

  function handlePostComment() {
    textarea.current.value = "";

    if (currentUser && commentContent) {
      db.collection("posts")
        .doc(id)
        .collection("comments")
        .add({ user: currentUser, content: commentContent });
    }

    setAddedComment(commentContent);
  }

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
    <div className="relative flex flex-col w-full pb-16 my-6 overflow-hidden text-sm border rounded-md shadow-md bg-slate-50 shadow-slate-100">
      <div className="flex items-center justify-between w-full p-4 lg:p-6">
        <div className="flex items-center justify-center space-x-2">
          <img
            src={avatar}
            className="rounded-full IMAGE bg-slate-300 w-7 h-7"
            /*   alt="user avatar" */
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
        className="max-h-[26rem] lg:max-h-[32rem] h-full object-scale-down select-none bg-slate-100 rounded-md"
      ></img>
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
        <div className="font-bold">
          {postLikes !== 0 ? postLikes : "No"}{" "}
          {postLikes === 1 ? "like" : "likes"}
        </div>
        <div className="flex">
          <a href="/" className="mr-1 font-bold lowercase">
            {username}
          </a>
          <div className="break-word max-w-[40ch] md:max-w-[75ch] mb-1">
            {description}
          </div>
        </div>
        <div className="COMM_CONTAINER">
          {commentsArray &&
            commentsArray.map((comment, index) => {
              return (
                <div key={index} className="flex COMMENT">
                  <a href="/" className="mr-1 font-bold lowercase">
                    {comment.user}
                  </a>
                  <div className="break-word">{comment.content}</div>
                </div>
              );
            })}
          {addedComment && (
            <div className="flex COMMENT">
              <a href="/" className="mr-1 font-bold lowercase">
                {user}
              </a>
              <div className="break-word">{addedComment}</div>
            </div>
          )}
        </div>

        <div className="text-xs text-neutral-400">{postTime}</div>
        <div className="absolute bottom-0 left-0 flex w-full ADD A COMMENT ">
          <textarea
            ref={textarea}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Add a comment..."
            className="w-full h-12 px-3 py-3 text-sm border-t resize-none focus:outline-slate-300 placeholder:text-slate-300"
          ></textarea>

          {commentContent ? (
            <button
              onClick={handlePostComment}
              className={`flex items-center justify-center text-sky-400 text-sm p-3 px-5 border-x border-t bg-neutral-50 cursor-pointer`}
            >
              Post
            </button>
          ) : (
            <button
              disabled
              className={`flex items-center justify-center text-sky-200 text-sm p-3 px-5 border-x border-t bg-neutral-50`}
            >
              Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
