// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgyJR0lCwW09R1HCHGxvHC4Z0jTiBQleA",
  authDomain: "project-2533626753169243264.firebaseapp.com",
  projectId: "project-2533626753169243264",
  storageBucket: "project-2533626753169243264.firebasestorage.app",
  messagingSenderId: "614316719652",
  appId: "1:614316719652:web:4d1777aaa0b2eb049e62b1"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
export default db;