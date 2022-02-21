import React from "react";
import Post from "./Post";

export default function Feed() {
  return (
    <div className="-z-1 pb-32">
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}
