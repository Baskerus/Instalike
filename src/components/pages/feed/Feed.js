import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db } from "../../../firebase";
import firebase from "firebase/compat/app";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  let user = firebase.auth().currentUser;

  useEffect(() => {
    // Returns to sign in page if the user is not signed in
    if (!user) {
      console.log("no user");
    }

    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, [user]);

  return (
    <div className="relative  < -z-1 pb-32 mt-14">
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
            />
          );
        })}
    </div>
  );
}
