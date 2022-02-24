import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { auth } from "../firebase";
import { resolvePath } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, username) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        console.log(username, " signed up.");
        return user.updateProfile({
          displayName: username,
        });
      });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    console.log(firebase.auth().currentUser.displayName, "signed out...");
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
