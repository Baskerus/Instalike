import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "../modals/Avatar";
import firebase from "firebase/compat/app";

export default function SignUpPage() {
  const { signup } = useAuth();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const currentUser = firebase.auth().currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  });

  async function handleSignUp() {
    try {
      await signup(email, password, username);
    } catch {
      console.log("Failed to create an account");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen p-4 overflow-hidden bg-slate-50">
      <div className="flex relative flex-col items-center justify-center w-[90%] max-w-sm animate-slideInLeft ease">
        <h1 className="mb-4 text-5xl font-logofont">Instalike</h1>
        <form className="flex flex-col items-center justify-center w-full space-y-4 ">
          <input
            className="w-full h-10 max-w-sm px-2 border rounded-md bg-slate-100"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <input
            className="w-full h-10 max-w-sm px-2 border rounded-md bg-slate-100"
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <input
            className="w-full h-10 max-w-sm px-2 border rounded-md bg-slate-100"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <span className="w-full ">
            <Link
              to="/sign-up"
              className="flex items-center justify-center mt-6 w-full h-10 max-w-sm  text-white bg-blue-500 rounded-md shadow-md"
              onClick={handleSignUp}
            >
              Sign Up
            </Link>
          </span>
        </form>
      </div>
      <div className="absolute bottom-0 flex items-center justify-center w-full h-16 space-x-1 text-sm border-t">
        <span className="text-slate-400">Already have an account?</span>
        <Link to="/" className="font-bold text-blue-500">
          Sign In
        </Link>
      </div>
    </div>
  );
}
