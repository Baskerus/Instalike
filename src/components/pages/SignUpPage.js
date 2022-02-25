import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function SignUpPage() {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    try {
      setLoading(true);
      await signup(email, password, username);
    } catch {
      console.log("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center bg-slate-50 p-4">
      <Link to="/">
        <MdClose className="absolute top-4 right-4 text-3xl cursor-pointer" />
      </Link>
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
        <Link
          to="/"
          className="flex w-full max-w-sm h-10 items-center justify-center bg-blue-500 text-white rounded-md shadow-md"
          onClick={!loading && handleSubmit}
        >
          Sign Up
        </Link>
      </form>
      <div className="absolute flex items-center justify-center bottom-0 w-full h-16 text-sm border-t space-x-1">
        <span className="text-slate-400">Already have an account?</span>
        <Link to="/" className="text-blue-500 font-bold">
          Sign In
        </Link>
      </div>
    </div>
  );
}
