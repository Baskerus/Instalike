import React, { useState } from "react";
import Loader from "../ui/Loader";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  let navigate = useNavigate();

  async function handleSignInButton(e) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      setLoading(false);
      setErrorMsg("Incorrect username or password.");
    }
    if (firebase.auth().currentUser) {
      console.log(firebase.auth().currentUser.displayName, "logged in.");
      setLoading(false);
      navigate("/feed");
    }
  }

  return (
    <div className="fixed flex flex-col w-screen h-screen items-center justify-center z-10 bg-slate-50 px-5">
      <h1 className="font-logofont text-5xl mb-4 transition-all duration-300">
        Instaclone
      </h1>
      {errorMsg && <div className="mb-4 text-red-600">{errorMsg}</div>}
      {loading ? (
        <div className="">
          <Loader />
        </div>
      ) : (
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
          <div className="flex w-full max-w-sm text-blue-400 font-bold text-xs justify-end">
            Forgot password?
          </div>
          <button
            to="/feed"
            className="flex w-full max-w-sm items-center justify-center h-10  bg-blue-500 text-white rounded-md shadow-md"
            onClick={handleSignInButton}
          >
            Sign in
          </button>
        </form>
      )}

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
