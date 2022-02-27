import React, { useState, useEffect, useRef } from "react";
import { db } from "../../../firebase";
import firebase from "firebase/compat/app";

function Comments({ id, setCommentsArray }) {
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUser = firebase.auth().currentUser.displayName;
  const textarea = useRef();

  useEffect(() => {
    // Gets data from the "comment" collection inside "posts"
    getComments();
    setCommentsArray(comments);
    return () => {
      setCommentsArray([]);
      setLoading(false);
    };
  }, [comments]);

  async function getComments() {
    setLoading(true);
    let comments = [];
    await db
      .collection("posts")
      .doc(id)
      .collection("comments")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          comments.push(doc.data());
          setLoading(false);
        });
      });
    setComments(comments);
    return comments;
  }

  function handlePostComment() {
    textarea.current.value = "";

    if (currentUser && commentContent) {
      db.collection("posts")
        .doc(id)
        .collection("comments")
        .add({ user: currentUser, content: commentContent });
    }
  }

  return (
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
  );
}

export default Comments;
