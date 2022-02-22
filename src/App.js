import { useState } from "react";
import BottomNav from "./components/BottomNav";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Stories from "./components/Stories";
import SignInModal from "./components/SignInModal";
import firebase from "firebase/compat/app";

function App() {
  const [signInOpen, setSignInOpen] = useState(true);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const authProps = {
    setEmail: setEmail,
    setPassword: setPassword,
    setSignUpOpen: setSignUpOpen,
    setSignInOpen: setSignInOpen,
    handleSignIn: handleSignIn,
    handleSignUp: handleSignUp,
    signInOpen: signInOpen,
    signUpOpen: signUpOpen,
    setUsername: setUsername,
  };

  function handleSignIn() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Signed in as: ", user.displayName);
        setSignInOpen(false);
        setSignedIn(true);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  function handleSignOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setSignedIn(false);
        console.log(username, "signed out!");
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
    <>
      {!signedIn ? (
        <SignInModal authProps={authProps} />
      ) : (
        <div className="App relative flex flex-col w-screen h-screen bg-slate-50 shadow-xl overflow-x-hidden overflow-y-scroll ">
          <Navbar signedIn={signedIn} setSignInOpen={setSignInOpen} />
          <Stories />
          <Feed />
          <BottomNav handleSignOut={handleSignOut} />
        </div>
      )}
    </>
  );
}

export default App;
