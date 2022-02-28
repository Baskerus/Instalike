import React, { useState, useEffect, useRef } from "react";
import { db } from "../../../firebase";
import firebase from "firebase/compat/app";
import Error from "../../modals/Error";

function Comments({ id, comments }) {
  const [commentContent, setCommentContent] = useState("");
  const [commentsArray, setCommentsArray] = useState([]);
  const [showError, setShowError] = useState(false);

  const currentUser = firebase.auth().currentUser.displayName;
  const textarea = useRef();

  useEffect(() => {
    if (comments) {
      console.log("Rendered comments...");
      setCommentsArray(comments);
    }
    return;
  }, []);

  async function handlePostComment() {
    if (commentsArray.length > 10) {
      setShowError(true);
      return;
    }
    setCommentsArray([
      ...commentsArray,
      { user: currentUser, content: commentContent },
    ]);
    await db
      .collection("posts")
      .doc(id)
      .update({
        comments: [
          ...commentsArray,
          { user: currentUser, content: commentContent },
        ],
      });
    textarea.current.value = "";
  }

  function onEnterPress(e) {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handlePostComment();
    }
  }

  return (
    <div>
      {showError && (
        <Error
          error={
            "Too many comments. Try again later in case someone regrets theirs. Had to stop somewhere, right?"
          }
          setShowError={setShowError}
        />
      )}
      <div className="absolute bottom-0 left-0 flex w-full ">
        <textarea
          ref={textarea}
          maxLength={120}
          onChange={(e) => setCommentContent(e.target.value)}
          onKeyDown={(e) => {
            onEnterPress(e);
          }}
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
      <div className={` max-h-[6rem] overflow-y-auto overflow-x-hidden`}>
        {commentsArray.map((comment, index) => {
          return (
            <div key={index} className="flex COMMENT">
              <a href="/" className="mr-1 font-bold lowercase">
                {comment.user}
              </a>
              <div className="break-word max-w-[80vw]">{comment.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
