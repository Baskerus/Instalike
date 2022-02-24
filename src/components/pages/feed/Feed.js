import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db } from "../../../firebase";

export default function Feed({ username }) {
  const [loading, setLoading] = useState();

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
    <div className="relative  < -z-1 pb-32 mt-14">
      -----> {username}
      {posts.map(({ post, id }) => {
        return (
          <Post
            key={id}
            id={id}
            username={post.username}
            avatar={post.avatar}
            image={post.imageUrl}
            description={post.description}
            likes={post.likes}
            timestamp={post.timestamp}
            likedBy={post.likedBy}
          />
        );
      })}
    </div>
  );
}
