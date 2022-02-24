import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/storage";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { GrRotateLeft } from "react-icons/gr";
import { IoMdImages } from "react-icons/io";

export default function ImageUpload({ username }) {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const storage = firebase.storage();
  const user = firebase.auth().currentUser;

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
  };
  return (
    <div className="fixed flex flex-col w-full h-full top-0 p-4 items-center justify-center backdrop-brightness-[15%] z-50">
      <div className="flex flex-col relative min-w-[240px] max-w-lg w-full h-[470px] items-center justify-center bg-slate-50 rounded-xl space-y-6">
        <div className="text-sm text-center px-4 pb-4 text-slate-500 border-b">
          Select an image, add a description and upload
        </div>
        <IoMdImages className="text-[100px] text-slate-300" />
        <textarea
          className="h-24 max-w-md w-[80%] p-3 text-sm"
          resize="none"
          placeholder="Enter image description..."
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {!image && (
          <label className="flex items-center justify-center w-10/12 h-10 bg-blue-500 text-white text-sm rounded-md shadow-md">
            Select and image
            <input
              className="border  hidden"
              type="file"
              onChange={handleChange}
            />
          </label>
        )}

        {image && (
          <div className="flex flex-col w-full items-center justify-center space-y-2">
            <span>{JSON.stringify(image.name)}</span>
            <Link
              to="/feed"
              onClick={handleUpload}
              className="flex w-full max-w-[10rem] h-10 items-center justify-center bg-blue-500  text-white rounded-md shadow-md"
            >
              Upload
            </Link>

            <label className="flex w-16 h-10 mt-1 py-1 text-slate-400">
              <GrRotateLeft className="w-full h-full"></GrRotateLeft>
              <input
                className="border  hidden"
                type="file"
                onChange={handleChange}
              />
            </label>
            {/*   <GrRotateLeft
              onClick={() => handleChange()}
              className=" w-16 h-10 mt-1 py-1 text-slate-400"
            /> */}
          </div>
        )}
      </div>
    </div>
  );
}
