import React from "react";
import { MdClose } from "react-icons/md";

function PostLikes({ likedBy, closeModal }) {
  return (
    <div className="absolute flex items-center justify-center w-full h-full backdrop-blur-sm bg-black-rgba animate-fadeIn ease-smooth">
      <div className="relative flex  items-center justify-center w-64 h-64 overflow-hidden rounded-md shadow-md bg-slate-50 shadow-neutral-600">
        <MdClose
          onClick={closeModal}
          className="absolute top-0 right-0 z-10 w-8 h-8 m-1 cursor-pointer text-slate-400"
        />
        <div className="absolute top-0 flex flex-col items-center justify-center w-full h-12 border ">
          Likes
        </div>
        <div className="flex flex-col">
          {likedBy.map((like, index) => {
            return (
              <span key={index} className="font-bold">
                {like}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PostLikes;
