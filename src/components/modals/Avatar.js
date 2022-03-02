import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import firebase from "firebase/compat/app";
import "firebase/storage";
import { db } from "../../firebase";

function Avatar({ setShowAvatar }) {
  const [avatar, setAvatar] = useState();

  const storage = firebase.storage();
  const user = firebase.auth().currentUser;

  function handleChange(e) {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  }

  function handleUpload() {
    try {
      storage
        .ref(`/avatars/${avatar.name}`)
        .put(avatar)
        .then(() => {
          storage
            .ref("/avatars")
            .child(avatar.name)
            .getDownloadURL()
            .then((url) => {
              // Post image to the database
              db.collection("avatars").add({
                imageUrl: url,
                username: user.displayName,
              });
              console.log("Image uploaded to DB");
            });
          console.log("Uploaded successfully");
        });
    } catch (error) {
      console.log(error);
    } finally {
      setShowAvatar(false);
    }
  }
  return (
    <div className="absolute right-0 top-[-14rem] flex items-center justify-center text-sm  animate-fadeIn z-[2]">
      <div className="relative flex flex-col items-center justify-center h-56 p-4 pb-0 space-y-4 text-sm rounded-lg rounded-b-none border border-b-0  w-64 bg-slate-50 text-slate-500 animate-slideInBottomFast">
        <MdClose
          onClick={() => setShowAvatar(false)}
          className="absolute top-0 right-0 w-8 h-8 m-2 cursor-pointer text-slate-400"
        />
        <span className="animate-slideInBottomFaster">
          Choose a profile image
        </span>
        <label className="flex items-center justify-center w-48 h-10 text-white truncate bg-blue-400 rounded-md shadow-lg cursor-pointer animate-slideInBottomFast">
          {avatar ? (
            <span className="w-32 truncate">{avatar.name}</span>
          ) : (
            "Select an image"
          )}
          <input
            onChange={handleChange}
            className="hidden w-full h-full"
            type="file"
          ></input>
        </label>

        <button
          onClick={handleUpload}
          className="flex items-center justify-center w-48 h-10 text-white bg-blue-500 rounded-md shadow-lg animate-slideInBottom"
        >
          Upload avatar
        </button>
      </div>
    </div>
  );
}

export default Avatar;
