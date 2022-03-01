import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/storage";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
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
    if (image == null) {
      alert("Please select an image.");
      return;
    }
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
    let file = e.target.files[0];
    if (e.target.files[0]) {
      setImage(file);
    }
  };
  return (
    <div className="fixed top-0 flex flex-col items-center justify-center w-full h-full p-4 bg-slate-100  animate-fadeIn">
      <div className="flex flex-col relative min-w-[240px] max-w-md w-full h-[470px] items-center justify-center bg-slate-50 rounded-xl space-y-2  shadow-xl">
        <MdClose
          onClick={() => navigate("/feed")}
          className="absolute top-0 right-0 w-10 h-10 p-2 m-2 cursor-pointer text-slate-500"
        />
        <div className="px-4 pb-4 text-sm text-center border-b text-slate-500">
          Select an image, add a caption and upload
        </div>
        <IoMdImages className="text-[100px] text-slate-300" />
        <textarea
          className="h-16 max-w-xs w-[80%] p-3 text-sm resize-none focus:outline-slate-300 rounded-md border"
          maxLength={80}
          placeholder="Enter image caption..."
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {!image && (
          <label className="flex items-center justify-center max-w-xs w-full h-10 text-sm text-white bg-blue-500 rounded-md shadow-md cursor-pointer">
            Select an image
            <input
              className="hidden border"
              type="file"
              onChange={handleChange}
            />
          </label>
        )}

        {image && (
          <div className="flex flex-col items-center justify-center w-full  animate-fadeIn">
            <label className="flex items-center justify-center max-w-xs w-full h-10 text-sm border bg-white border-blue-500 text-blue-500 rounded-md shadow-md cursor-pointer overflow-hidden truncate">
              <span className="flex items-center justify-center w-full p-4">
                {image.name}
              </span>
              <input
                className="hidden border"
                type="file"
                onChange={handleChange}
              />
            </label>

            <div className="flex items-center justify-center w-full mt-4 text-sm">
              <Link
                to="/feed"
                onClick={handleUpload}
                className="flex w-full max-w-[10rem] h-10 items-center justify-center bg-blue-500  text-white rounded-md shadow-md cursor-pointer animate-fadeIn"
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
