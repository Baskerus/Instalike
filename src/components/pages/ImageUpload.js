import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/storage";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { GrRotateLeft } from "react-icons/gr";
import { IoMdImages } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

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
    <div className="fixed flex flex-col w-full h-full top-0 p-4 items-center justify-center bg-slate-300">
      <div className="flex flex-col relative min-w-[240px] max-w-lg w-full h-[470px] items-center justify-center bg-slate-50 rounded-xl space-y-6  shadow-xl">
        <MdClose
          onClick={() => navigate("/feed")}
          className="absolute top-0 right-0 w-10 h-10 p-2 m-2 text-slate-500 cursor-pointer"
        />
        <div className="text-sm text-center px-4 pb-4 text-slate-500 border-b">
          Select an image, add a caption and upload
        </div>
        <IoMdImages className="text-[100px] text-slate-300 " />
        <textarea
          className="h-16 max-w-md w-[80%] p-3 text-sm resize-none focus:outline-slate-300"
          maxLength={60}
          placeholder="Enter image caption..."
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {!image && (
          <label className="flex items-center justify-center w-8/12 h-10 bg-blue-500 text-white text-sm rounded-md shadow-md cursor-pointer">
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
            <span className="flex w-full justify-center items-center truncate px-12 sm:px-32 text-slate-500">
              {image.name}
            </span>
            <div className="flex w-full justify-center items-center">
              <label className="flex w-16 h-10 mt-1 py-1 text-slate-400">
                <GrRotateLeft className="w-full h-full cursor-pointer"></GrRotateLeft>
                <input
                  className="border  hidden"
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
