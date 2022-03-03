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
      setCommentsArray(comments);
    }
    return;
  }, [comments]);

  async function handlePostComment() {
    if (commentsArray.length > 10) {
      setShowError(true);
      return;
    }
    if (textarea.current.value) {
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
    }

    textarea.current.value = "";
  }

  function onEnterPress(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handlePostComment();
    }
  }

  return (
    <div className="">
      {showError && (
        <Error
          error={
            "Too many comments. Try again later in case someone regrets theirs. Had to stop somewhere, right?"
          }
          setShowError={setShowError}
        />
      )}
      <div className="absolute h-fit bottom-0 left-0 flex w-full">
        <textarea
          ref={textarea}
          maxLength={120}
          onChange={(e) => setCommentContent(e.target.value)}
          onKeyDown={(e) => {
            onEnterPress(e);
          }}
          placeholder="Add a comment..."
          className=" w-full h-10 px-3 focus:h-12 focus:py-3 py-[11px] focus:text-sm border-t resize-none focus:outline-slate-300 placeholder:text-slate-300 text-xs transition-all duration-200"
        ></textarea>
        {commentContent ? (
          <button
            onClick={handlePostComment}
            className={`flex items-center justify-center text-sky-400 text-sm  px-5 border-x border-t bg-neutral-50 cursor-pointer hover:bg-slate-100 transition-all duration-200 hover:text-sky-600 hover:shadow-sm`}
          >
            Post
          </button>
        ) : (
          <button
            disabled
            className={`flex items-center justify-center text-sky-200 text-sm  px-5 border-x border-t bg-neutral-50`}
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
