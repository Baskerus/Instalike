import React from "react";
import { MdClose } from "react-icons/md";

function Avatar({ setPending, setAvatar, handleSignUp, avatar }) {
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
    console.log(avatar.name);
  };
  return (
    <div className="absolute flex items-center justify-center w-screen h-screen text-sm border backdrop-blur-sm">
      <div className="relative flex flex-col items-center justify-center h-56 p-4 space-y-4 text-sm border rounded-lg shadow-lg w-72 bg-slate-50 text-slate-500">
        <MdClose
          onClick={() => setPending(false)}
          className="absolute top-0 right-0 w-8 h-8 m-2 cursor-pointer text-slate-400"
        />
        <span>Choose a profile image</span>
        <label className="flex items-center justify-center w-48 h-10 text-white truncate bg-blue-400 rounded-md shadow-lg cursor-pointer">
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
          onClick={handleSignUp}
          className="flex items-center justify-center w-48 h-10 text-white bg-blue-500 rounded-md shadow-lg"
        >
          Upload and sign up
        </button>
      </div>
    </div>
  );
}

export default Avatar;

// ADD UPLOAD AVATAR FUNCTIONALITY :**** dobro jutro isto:D:D:D:DD :( :*( <:*(
