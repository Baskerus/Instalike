import React from "react";
import SignUpModal from "./SignUpModal";

export default function SignInModal({
  setEmail,
  setPassword,
  handleSignIn,
  setSignUpOpen,
  setSignInOpen,
  signUpOpen,
  setUsername,
  handleSignUp
}) {
  function handleSignInButton(e) {
    e.preventDefault();
    handleSignIn();
  }

  if (signUpOpen) {
    return (
      <SignUpModal
        setEmail={setEmail}
        setUsername={setUsername}
        setPassword={setPassword}
        handleSignUp={handleSignUp}
        setSignUpOpen={setSignUpOpen}
        setSignInOpen={setSignInOpen}
      />
    );
  } else {
    return (
      <div className="fixed flex flex-col w-screen h-screen items-center justify-center z-10 bg-slate-50 px-5">
        <h1 className="font-logofont text-5xl mb-4">Instaclone</h1>
        <form className=" flex flex-col w-full items-center justify-center space-y-4 text-sm">
          <input
            className="w-full max-w-sm h-10 border rounded-md px-2 bg-slate-100"
            name="email"
            type="email"
            placeholder="Email or username"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="w-full max-w-sm h-10 border rounded-md px-2 bg-slate-100"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <a className="flex w-full max-w-sm text-blue-400 font-bold text-xs justify-end">
            Forgot password?
          </a>
          <button
            className="w-full max-w-sm h-10 bg-blue-500 text-white rounded-md shadow-md"
            onClick={handleSignInButton}
          >
            Log In
          </button>
        </form>
        <div className="absolute flex items-center justify-center bottom-0 w-full h-16 text-sm border-t space-x-1">
          <span className="text-slate-400">Don't have an account?</span>
          <span
            onClick={() => setSignUpOpen(true)}
            className="text-blue-500 font-bold"
          >
            Sign Up
          </span>
          .
        </div>
      </div>
    );
  }
}
