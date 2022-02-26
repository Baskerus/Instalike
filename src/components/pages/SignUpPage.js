import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { BsChevronLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "../modals/Avatar";
import firebase from "firebase/compat/app";

export default function SignUpPage() {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pending, setPending] = useState(false);

  const currentUser = firebase.auth().currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  });

  async function handleSubmit(e) {
    /*   try {
      setLoading(true);
      await signup(email, password, username);
    } catch {
      console.log("Failed to create an account");
    } */
    setLoading(false);
    setPending(false);
  }

  async function handleSignUp() {
    try {
      setLoading(true);
      await signup(email, password, username);
    } catch {
      console.log("Failed to create an account");
    }
    setLoading(false);
    setPending(false);
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen p-4 overflow-hidden bg-slate-50">
      <div className="flex relative flex-col items-center justify-center w-[90%] max-w-sm animate-slideInLeft ease-smooth">
        <h1 className="mb-4 text-5xl font-logofont">Instaclone</h1>
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
          <Link
            to="/sign-up"
            className="flex items-center justify-center w-full h-10 max-w-sm text-white bg-blue-500 rounded-md shadow-md"
            onClick={handleSignUp}
          >
            Sign Up
          </Link>
        </form>
        <Link
          to="/"
          className="absolute hidden w-12 h-12 font-bold cursor-pointer -left-20 text-slate-300 sm:block"
        >
          <BsChevronLeft className="w-full h-full" />
        </Link>

        {pending && (
          <Avatar
            setPending={setPending}
            handleSignUp={handleSignUp}
          />
        )}
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
