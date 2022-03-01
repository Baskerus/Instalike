import { useState, useEffect } from "react";
import BottomNav from "./components/ui/BottomNav";
import Feed from "./components/pages/feed/Feed";
import Navbar from "./components/ui/Navbar";
import SignInPage from "./components/pages/SignInPage";
import ImageUpload from "./components/pages/ImageUpload";
import UserProfile from "./components/pages/user-profile/UserProfile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./components/pages/SignUpPage";
import { AuthProvider } from "./contexts/AuthContext";
import { db } from "./firebase";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarsArray, setAvatarsArray] = useState();
  const [avatarUsers, setAvatarUsers] = useState();

  useEffect(() => {
    db.collection("avatars").onSnapshot((snapshot) => {
      setAvatarsArray(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          details: doc.data(),
        }))
      );
    });
  }, []);
  useEffect(() => {
    if (avatarsArray) {
      let avatarUsers = [];
      avatarsArray.map((avatar) => {
        avatarUsers.push(avatar.details.username);
        setAvatarUsers([...avatarUsers, avatar.details.username]);
      });
    }
  }, [avatarsArray]);

  const authProps = {
    email: email,
    password: password,
    setEmail: setEmail,
    setPassword: setPassword,
    setUsername: setUsername,
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="h-full min-h-screen overflow-hidden bg-slate-100 text-slate-800">
          <Routes>
            <Route exact path="/" element={<SignInPage />}></Route>
            <Route
              exact
              path="/sign-up"
              element={<SignUpPage authProps={authProps} />}
            ></Route>
            <Route
              exact
              path="/feed/*"
              element={
                <div className="relative flex items-center justify-center w-screen h-full">
                  <Navbar username={username} />
                  <Routes>
                    <Route exact path="/" element={<Feed />}></Route>
                    <Route exact path="/user" element={<UserProfile />}></Route>
                  </Routes>
                  <BottomNav
                    avatarUsers={avatarUsers}
                    avatarsArray={avatarsArray}
                  />
                </div>
              }
            ></Route>
            <Route
              exact
              path="/upload"
              element={<ImageUpload username={username} />}
            ></Route>
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
