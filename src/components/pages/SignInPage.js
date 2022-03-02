import React, { useState, useEffect } from "react";
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

  const navigate = useNavigate();

  useEffect(() => {
    // Prevents already logged in user from entering sign in page
    if (firebase.auth().currentUser) {
      navigate("/feed");
      return;
    }
    return;
  }, [navigate]);

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
    <div className="fixed z-10 flex flex-col items-center justify-center w-screen h-screen px-5 bg-slate-50">
      <div className="flex flex-col items-center justify-center w-[90%] max-w-96 animate-slideInRight">
        <h1 className="mb-4 text-5xl transition-all duration-300 font-logofont">
          Instalike
        </h1>
        {errorMsg && <div className="mb-4 text-red-600">{errorMsg}</div>}
        {loading ? (
          <div className="">
            <Loader />
          </div>
        ) : (
          <form className="flex flex-col items-center justify-center w-full space-y-4 text-sm ">
            <input
              className="w-full h-10 max-w-sm px-2 border rounded-md bg-slate-100"
              name="email"
              type="email"
              placeholder="Email or username"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="w-full h-10 max-w-sm px-2 border rounded-md bg-slate-100"
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="flex justify-end w-full max-w-sm text-xs font-bold text-blue-400">
              Forgot password?
            </div>
            <button
              to="/feed"
              type="submit"
              className="flex items-center justify-center w-full h-10 max-w-sm text-white bg-blue-500 rounded-md shadow-md"
              onClick={handleSignInButton}
            >
              Sign in
            </button>
          </form>
        )}
      </div>
      <div className="absolute bottom-0 flex items-center justify-center w-full h-16 space-x-1 text-sm border-t bg-slate-50">
        <span className="text-slate-400">Don't have an account?</span>
        <Link to="/sign-up" className="font-bold text-blue-500">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
