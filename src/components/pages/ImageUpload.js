import React, { useState, useRef } from "react";
import firebase from "firebase/compat/app";
import "firebase/storage";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { IoMdImages } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";
import Loader from "../ui/Loader";

// TODO:
// Limit the size of the image user can upload

export default function ImageUpload({ setUploadOpen }) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [image, setImage] = useState(null);
  const textarea = useRef();

  const storage = firebase.storage();
  const user = firebase.auth().currentUser;

  function handleUpload() {
    if (image == null) {
      alert("Please select an image.");
      return;
    }
    textarea.current.value = "";
    setLoading(true);
    uploadToDb();
  }

  async function uploadToDb() {
    await storage
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
            setLoading(false);
            setShowConfirm(true);
            setTimeout(() => {
              setShowConfirm(false);
              setUploadOpen(false);
            }, 600);
          });
      });
  }

  const handleChange = (e) => {
    let file = e.target.files[0];
    if (e.target.files[0]) {
      setImage(file);
    }
  };
  return (
    <div className="absolute flex flex-col top-12 right-0 p-6 min-w-[240px] max-w-[19rem] w-[100vw] h-[410px] items-center justify-center bg-slate-50 rounded-t-none rounded-xl space-y-2 shadow-md animate-slideInTop z-30">
      <MdClose
        onClick={() => setUploadOpen(false)}
        className="absolute top-0 right-0 w-12 h-12 p-2 m-2 mr-0 cursor-pointer text-slate-600 hover:text-neutral-400 hover:scale-110 transition-all duration-300"
      />
      <div className="px-4 pb-4 text-sm text-center text-slate-500">
        Select an image, add a caption and upload
      </div>
      {showConfirm ? (
        <div className="flex flex-col justify-center items-center">
          <BsCheckCircle className="text-[40px] mb-4 text-blue-500 animate-ping" />
          <span className="text-blue-500">Image uploaded.</span>
        </div>
      ) : (
        <div>
          {loading ? (
            <Loader />
          ) : (
            <IoMdImages className="text-[100px] text-slate-300" />
          )}
        </div>
      )}

      <textarea
        ref={textarea}
        className="h-16 max-w-xs w-full p-3 text-sm resize-none focus:outline-slate-300 rounded-md border"
        maxLength={80}
        placeholder="Enter image caption..."
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      {!image && (
        <label className="flex items-center justify-center w-full max-w-xs h-10 text-sm text-white bg-blue-500 rounded-md shadow-md cursor-pointer">
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
          <label className="flex items-center justify-center max-w-xs w-full h-10 text-sm border bg-white focus:border-blue-500 text-neutral-400 rounded-md shadow-md cursor-pointer overflow-hidden truncate hover:border-2 hover:border-slate-400">
            <span className="flex items-center justify-center w-full p-4 ">
              {image.name}
            </span>
            <input
              className="hidden border"
              type="file"
              onChange={handleChange}
            />
          </label>

          <div className="flex items-center justify-center w-full mt-4 text-sm">
            <button
              onClick={handleUpload}
              className="flex w-full max-w-[10rem] h-10 items-center justify-center bg-blue-500  text-white rounded-md shadow-md cursor-pointer animate-fadeIn"
            >
              Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
