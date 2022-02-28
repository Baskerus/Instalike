import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/storage";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { GrRotateLeft } from "react-icons/gr";
import { IoMdImages } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// TODO:
// Limit the size of the image user can upload

export default function ImageUpload() {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

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
              comments: [],
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
    <div className="fixed top-0 flex flex-col items-center justify-center w-full h-full p-4 bg-slate-300">
      <div className="flex flex-col relative min-w-[240px] max-w-md w-full h-[470px] items-center justify-center bg-slate-50 rounded-xl space-y-6  shadow-xl">
        <MdClose
          onClick={() => navigate("/feed")}
          className="absolute top-0 right-0 w-10 h-10 p-2 m-2 cursor-pointer text-slate-500"
        />
        <div className="px-4 pb-4 text-sm text-center border-b text-slate-500">
          Select an image, add a caption and upload
        </div>
        <IoMdImages className="text-[100px] text-slate-300 " />
        <textarea
          className="h-16 max-w-sm w-[80%] p-3 text-sm resize-none focus:outline-slate-300 rounded-md border"
          maxLength={80}
          placeholder="Enter image caption..."
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {!image && (
          <label className="flex items-center justify-center w-8/12 h-10 text-sm text-white bg-blue-500 rounded-md shadow-md cursor-pointer">
            Select and image
            <input
              className="hidden border"
              type="file"
              onChange={handleChange}
            />
          </label>
        )}

        {image && (
          <div className="flex flex-col items-center justify-center w-full space-y-2">
            <span className="flex items-center justify-center w-48 md:w-80 truncate text-slate-500 text-xs">
              {image.name}
            </span>
            <div className="flex items-center justify-center w-full">
              <label className="flex w-16 h-10 py-1 mt-1 text-slate-400">
                <GrRotateLeft className="w-full h-full cursor-pointer"></GrRotateLeft>
                <input
                  className="hidden border"
                  type="file"
                  onChange={handleChange}
                />
              </label>
              <Link
                to="/feed"
                onClick={handleUpload}
                className="flex w-full max-w-[10rem] h-10 items-center mr-8 justify-center bg-blue-500  text-white rounded-md shadow-md cursor-pointer"
              >
                Upload
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
