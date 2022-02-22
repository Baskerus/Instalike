import React from "react";
import { MdClose } from "react-icons/md";

export default function SignUpModal({
  handleSignUp,
  setEmail,
  setUsername,
  setPassword,
  setSignUpOpen,
  setSignInOpen,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    handleSignUp();
  }

  function handleBackButton() {
    setSignUpOpen(false);
    setSignInOpen(true);
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center bg-slate-50 p-4">
      {/*  <button className="flex w-full max-w-sm h-10 justify-center items-center bg-blue-500 text-white rounded-md shadow-md space-x-2">
        <FaFacebookSquare className="text-2xl" />
        <span>Log in with Facebook</span>
      </button> */}
      <MdClose
        onClick={() => {
          setSignUpOpen(false);
        }}
        className="absolute top-4 right-4 text-3xl cursor-pointer"
      />
      <h1 className="font-logofont text-5xl mb-12">Instaclone</h1>
      <form className="flex flex-col items-center justify-center w-full space-y-4">
        <input
          className="w-full max-w-sm h-10 border rounded-md px-2 bg-slate-100"
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          className="w-full max-w-sm h-10 border rounded-md px-2 bg-slate-100"
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <input
          className="w-full max-w-sm h-10 border rounded-md px-2 bg-slate-100"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button
          className="w-full max-w-sm h-10 bg-blue-500 text-white rounded-md shadow-md"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </form>
      <div className="absolute flex items-center justify-center bottom-0 w-full h-16 text-sm border-t space-x-1">
        <span className="text-slate-400">Already have an account?</span>
        <span onClick={handleBackButton} className="text-blue-500 font-bold">
          Sign In
        </span>
        .
      </div>
    </div>
  );
}
