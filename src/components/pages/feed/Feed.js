import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db } from "../../../firebase";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  let user = firebase.auth().currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    // Returns to sign in page if the user is not signed in
    if (!user) {
      console.log("No user was detected - returning to sign in...");
      navigate("/", { replace: true });
      // v fixes "Can't perform a React state update on an unmounted component."
      return;
    }

    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, [user, navigate]);

  return (
    <div className="w-full max-w-2xl pb-32 mt-16 space-y-6 overflow-hidden md:space-y-10 lg:space-y-16">
      {user &&
        posts.map(({ post, id }) => {
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
              comments={post.comments}
            />
          );
        })}
    </div>
  );
}
