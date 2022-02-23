import { useState, useEffect } from "react";
import BottomNav from "./components/ui/BottomNav";
import Feed from "./components/pages/feed/Feed";
import Navbar from "./components/ui/Navbar";
import SignInModal from "./components/modals/SignInModal";
import firebase from "firebase/compat/app";
import ImageUpload from "./ImageUpload";
import UserProfile from "./components/pages/user-profile/UserProfile";
import {BrowserRouter, Route, Switch} from "react-router-dom"

function App() {
  const [signInOpen, setSignInOpen] = useState(true);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [uploadOpen, setUploadOpen] = useState(false);

  const authProps = {
    setEmail: setEmail,
    setPassword: setPassword,
    setUsername: setUsername,
    setSignUpOpen: setSignUpOpen,
    setSignInOpen: setSignInOpen,
    handleSignIn: handleSignIn,
    handleSignUp: handleSignUp,
    signInOpen: signInOpen,
    signUpOpen: signUpOpen,
  };

  function handleSignIn() {
    setErrorMsg(false);
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        setCurrentUser(user);
        setSignInOpen(false);
        setSignedIn(true);
        setLoading(false);
        console.log(user.displayName, "signed in...");
      })
      .catch((error) => {
        setLoading(false);
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/user-not-found") {
          setErrorMsg("Incorrect email or password");
        } else if (errorCode === "auth/invalid-email") {
          setErrorMsg("Invalid email adress.");
        } else {
          alert(errorCode);
        }
      });
  }

  function handleSignOut() {
    console.log(currentUser.displayName, "signed out...");
    firebase
      .auth()
      .signOut()
      .then(() => {
        setSignedIn(false);
      })
      .catch((error) => {
        // An error happened.
      });
  }

  function handleSignUp() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Signed UP with username:", username);
        setSignedIn(true);
        setSignUpOpen(false);
        return user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (
    <div className="relative">
      {!signedIn ? (
        <SignInModal
          authProps={authProps}
          loading={loading}
          errorMsg={errorMsg}
        />
      ) : (
        <div className="App relative flex flex-col w-screen h-screen bg-slate-50 shadow-xl overflow-x-hidden ">
          {uploadOpen && <ImageUpload setUploadOpen={setUploadOpen} username={currentUser.displayName}/>}
          <Navbar signedIn={signedIn} setSignInOpen={setSignInOpen} />
          <Feed />
          <BottomNav handleSignOut={handleSignOut} />
        </div>
      )}
    </div>
  );
}

export default App;
