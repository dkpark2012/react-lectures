// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbU1jSbHALu3nyY8mTMolyt0C35ADzZ8U",
  authDomain: "react50-f94a5.firebaseapp.com",
  databaseURL: "https://react50-f94a5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react50-f94a5",
  storageBucket: "react50-f94a5.firebasestorage.app",
  messagingSenderId: "599477242228",
  appId: "1:599477242228:web:92206abfe45e1488334421",
  measurementId: "G-HZC498DZGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);