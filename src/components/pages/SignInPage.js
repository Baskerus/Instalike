import React from "react";
import SignUpModal from "./SignUpPage";
import Loader from "../ui/Loader";
import { Link } from "react-router-dom";

export default function SignInPage({ authProps, loading, errorMsg }) {
  function handleSignInButton(e) {
    authProps.handleSignIn();
  }

  if (authProps.signUpOpen) {
    return <SignUpModal authProps={authProps} />;
  } else {
    return (
      <div className="fixed flex flex-col w-screen h-screen items-center justify-center z-10 bg-slate-50 px-5">
        {loading && (
          <div className="absolute top-[20%]">
            <Loader />
          </div>
        )}
        <h1 className="font-logofont text-5xl mb-4">Instaclone</h1>
        {errorMsg && <div className="mb-4 text-red-600">{errorMsg}</div>}
        <form className=" flex flex-col w-full items-center justify-center space-y-4 text-sm">
          <input
            className="w-full max-w-sm h-10 border rounded-md px-2 bg-slate-100"
            name="email"
            type="email"
            placeholder="Email or username"
            onChange={(e) => {
              authProps.setEmail(e.target.value);
            }}
          />
          <input
            className="w-full max-w-sm h-10 border rounded-md px-2 bg-slate-100"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              authProps.setPassword(e.target.value);
            }}
          />
          <a className="flex w-full max-w-sm text-blue-400 font-bold text-xs justify-end">
            Forgot password?
          </a>
          <Link
            to="/feed"
            className="flex w-full max-w-sm items-center justify-center h-10  bg-blue-500 text-white rounded-md shadow-md"
            onClick={handleSignInButton}
          >
            Sign in
          </Link>
        </form>
        <div className="absolute flex items-center justify-center bottom-0 w-full h-16 text-sm border-t space-x-1">
          <span className="text-slate-400">Don't have an account?</span>
          <Link to="/sign-up" className="text-blue-500 font-bold">
            Sign Up
          </Link>
          .
        </div>
      </div>
    );
  }
}
