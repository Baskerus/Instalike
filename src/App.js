import { useState, useEffect } from "react";
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
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const authProps = {
    email: email,
    password: password,
    setEmail: setEmail,
    setPassword: setPassword,
    setUsername: setUsername,
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/sign-in"
            element={<SignInPage />}
          ></Route>
          <Route
            exact
            path="/sign-up"
            element={<SignUpPage authProps={authProps} />}
          ></Route>
          <Route
            exact
            path="/feed/*"
            element={
              <div className="App relative flex flex-col w-screen h-screen bg-slate-50 shadow-xl overflow-x-hidden ">
                <div>
                  <Navbar username={username} />
                  <Routes>
                    <Route exact path="/" element={<Feed />}></Route>
                    <Route exact path="/user" element={<UserProfile />}></Route>
                  </Routes>
                  <BottomNav />
                </div>
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
    </AuthProvider>
  );
}

export default App;
