import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import firebase from "firebase/compat/app";
import "firebase/storage";
import { db } from "../../firebase";

function Avatar({ setShowAvatar, avatarsArray }) {
  const [avatar, setAvatar] = useState();

  const storage = firebase.storage();
  const user = firebase.auth().currentUser;

  function handleChange(e) {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  }

  function handleUpload() {
    let avatarUsers = [];
    avatarsArray.forEach((avatar) => {
      avatarUsers.push(avatar.details.username);
    });

    if (avatar && !avatarUsers.includes(user.displayName)) {
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
    } else {
      console.log("Prevented avatar upload");
      return;
    }
  }
  return (
    <div className="absolute right-0 bottom-16 flex items-center justify-center text-sm  animate-fadeIn z-[2] ">
      <div className="relative flex flex-col items-center justify-center w-64 p-4 pb-8 space-y-4 text-sm border border-b-0 rounded-lg rounded-b-none bg-slate-50 text-slate-500 animate-slideInBottomFast">
        <MdClose
          onClick={() => setShowAvatar(false)}
          className="absolute top-0 right-0 w-8 h-8 p-1 m-2 cursor-pointer text-slate-400"
        />
        <span className="animate-slideInBottomFaster">Choose an avatar</span>
        <label className="flex items-center justify-center w-48 h-10 text-white truncate bg-blue-400 rounded-md shadow-lg cursor-pointer animate-slideInBottomFast">
          {avatar ? (
            <span className="w-32 text-center truncate">{avatar.name}</span>
          ) : (
            "Select an image"
          )}
          <input
            onChange={handleChange}
            className="hidden w-full h-full"
            type="file"
          ></input>
        </label>

        {avatar && (
          <button
            onClick={handleUpload}
            className="flex items-center justify-center w-48 h-10 text-white bg-blue-500 rounded-md shadow-lg animate-slideInBottomFaster"
          >
            Upload avatar
          </button>
        )}
      </div>
    </div>
  );
}

export default Avatar;
