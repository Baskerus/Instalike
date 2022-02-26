import React, { useState, useEffect } from "react";
import Loader from "../ui/Loader";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";

function Authentication() {
  const { login,signup } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [openModal, setOpenModal] = useState("signin")
  const navigate = useNavigate();

  return (
      <div>
               {openModal === "signin" && ""}
      </div>
 
  );
}

export default Authentication;
