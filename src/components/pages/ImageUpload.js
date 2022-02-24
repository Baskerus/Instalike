import React, { useState, useEffect } from "react";
import { IoMdImages } from "react-icons/io";
import firebase from "firebase/compat/app";
import "firebase/storage";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

export default function ImageUpload({ username }) {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const storage = firebase.storage();
  const user = firebase.auth().currentUser;

  useEffect(() => {
    console.log(user.displayName);
  }, [user]);

  function handleUpload() {
    if (image == null) return;
    storage
      .ref(`/images/${image.name}`)
      .put(image)
      .then(() => {
        storage
          .ref("/images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // Post image to the database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              description: description,
              imageUrl: url,
              username: user.displayName,
              likes: 0,
              likedBy: [],
            });
            console.log("Image uploaded to DB");
          });
        console.log("Uploaded successfully");
      });
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    console.log(username);
  };
  return (
    <div className="fixed flex flex-col w-full h-full top-0 p-4 items-center justify-center backdrop-brightness-[15%] z-50">
      <div className="flex flex-col relative w-96 h-96 items-center justify-center bg-slate-50 rounded-xl space-y-6">
        <textarea
          className="h-24 w-[80%] p-2"
          resize="none"
          placeholder="Enter image description..."
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input type="file" onChange={handleChange} />
        <Link
          to="/feed"
          onClick={handleUpload}
          className="flex w-full max-w-[10rem] h-10 items-center justify-center bg-blue-500  text-white rounded-md shadow-md"
        >
          Upload
        </Link>
      </div>
    </div>
  );
}
