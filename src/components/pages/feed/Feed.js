import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db } from "../../../firebase";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";

export default function Feed({ avatarsArray }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  let user = firebase.auth().currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    // Returns to sign in page if the user is not signed in
    if (!user) {
      console.log("No user was detected - returning to sign in...");
      navigate("/", { replace: true });
      return;
    }
    setLoading(true);
    try {
      console.log("loading...");
      db.collection("posts").onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
    } catch (error) {
      alert(error);
      setLoading(false);
    } finally {
      console.log("loaded.");
    }
    setLoading(false);
    return () => {
      setPosts([]);
    };
  }, [user, navigate]);

  return (
    <>
      {loading ? (
        <div className="mt-64">
          <Loader />
        </div>
      ) : (
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
                  avatarsArray={avatarsArray}
                />
              );
            })}
        </div>
      )}
    </>
  );
}
