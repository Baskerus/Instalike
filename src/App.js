import { useState } from "react";
import BottomNav from "./components/ui/BottomNav";
import Feed from "./components/pages/feed/Feed";
import Navbar from "./components/ui/Navbar";
import SignInPage from "./components/pages/SignInPage";
import firebase from "firebase/compat/app";
import ImageUpload from "./components/pages/ImageUpload";
import UserProfile from "./components/pages/user-profile/UserProfile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./components/pages/SignUpPage";
import Loader from "./components/ui/Loader";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const authProps = {
    setEmail: setEmail,
    setPassword: setPassword,
    setUsername: setUsername,
    handleSignIn: handleSignIn,
    handleSignUp: handleSignUp,
  };

  function handleSignIn() {
    setErrorMsg(false);
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        setUsername(user.displayName);
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
    console.log(username, "signed out...");
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
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/sign-in"
          element={
            <SignInPage
              authProps={authProps}
              loading={loading}
              errorMsg={errorMsg}
            />
          }
        ></Route>
        <Route
          exact
          path="/sign-up"
          element={
            <SignUpPage
              authProps={authProps}
              loading={loading}
              errorMsg={errorMsg}
            />
          }
        ></Route>
        <Route
          exact
          path="/feed/*"
          element={
            <div className="App relative flex flex-col w-screen h-screen bg-slate-50 shadow-xl overflow-x-hidden ">
              {loading ? (
                <div className="flex w-full h-full items-center justify-center">
                  <Loader />
                </div>
              ) : (
                <div>
                  <Navbar username={username} />
                  <Routes>
                    <Route exact path="/" element={<Feed />}></Route>
                    <Route exact path="/user" element={<UserProfile/>}></Route>
                  </Routes>
                  <BottomNav handleSignOut={handleSignOut} />
                </div>
              )}
            </div>
          }
        ></Route>
        <Route
          exact
          path="/upload"
          element={<ImageUpload username={username} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
