import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCR1VRHDoBM3sS_0FJavH_t7dgg5vclhOM",
  authDomain: "instaclone-32cc7.firebaseapp.com",
  databaseURL:
    "https://instaclone-32cc7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "instaclone-32cc7",
  storageBucket: "instaclone-32cc7.appspot.com",
  messagingSenderId: "632496129875",
  appId: "1:632496129875:web:acece57d554d2dd8d643a6",
  measurementId: "G-L0LZYTJ06D",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth };
