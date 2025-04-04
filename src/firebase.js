import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAq1-0Ux-0TuYr3xx9MX8eZgXaUIUKsGfw",
  authDomain: "reapers-home.firebaseapp.com",
  databaseURL: "https://reapers-home-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "reapers-home",
  storageBucket: "reapers-home.appspot.com",
  messagingSenderId: "948912254625",
  appId: "1:948912254625:web:75d58666c66c8940f00e89"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

