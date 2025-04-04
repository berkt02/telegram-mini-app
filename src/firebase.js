// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCK9gPS-vFAGllukaaqAGxcLGPcockkOqM",
  authDomain: "reaper-s-home.firebaseapp.com",
  databaseURL: "https://reapers-home-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "reaper-s-home",
  storageBucket: "reaper-s-home.appspot.com",
  messagingSenderId: "444788097451",
  appId: "1:444788097451:web:b672bdbc0cd188543752ee"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
