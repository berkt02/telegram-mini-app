// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyKp9gYs-0fAGliuakqAGgclK9cooKkOqM",
  authDomain: "reaper-s-home.firebaseapp.com",
  databaseURL: "https://reaper-s-home-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "reaper-s-home",
  storageBucket: "reaper-s-home.appspot.com",
  messagingSenderId: "444788097451",
  appId: "1:444788097451:web:b672bdcb0cd188543752ee"
};

// Инициализация
const app = initializeApp(firebaseConfig);

// Экспорт базы
export const db = getDatabase(app);
