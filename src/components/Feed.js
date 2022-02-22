import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db } from "../firebase";

export default function Feed() {
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const [posts, setPosts] = useState([]);

  return (
    <div className="-z-1 pb-32">
      {posts.map(({ post, id }) => {
        return (
          <Post
            key={id}
            username={post.username}
            avatar={post.avatar}
            image={post.image}
            description={post.description}
            likes={post.likes}
          />
        );
      })}
    </div>
  );
}
