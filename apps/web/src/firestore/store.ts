// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjwCI5jg2k4pl-0f9fAdhm-dBGT6hk5Lg",
  authDomain: "chess-game-aca46.firebaseapp.com",
  projectId: "chess-game-aca46",
  storageBucket: "chess-game-aca46.appspot.com",
  messagingSenderId: "426846498870",
  appId: "1:426846498870:web:299cdc1e5157fbabe92897"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);