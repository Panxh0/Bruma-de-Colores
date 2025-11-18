// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwXt1jHy-rISI4tgm3cP0WH73wZxEgYe4",
  authDomain: "bruma-de-colores.firebaseapp.com",
  databaseURL: "https://bruma-de-colores-default-rtdb.firebaseio.com",
  projectId: "bruma-de-colores",
  storageBucket: "bruma-de-colores.firebasestorage.app",
  messagingSenderId: "549288253172",
  appId: "1:549288253172:web:fe470e69aa420e545770a1",
  measurementId: "G-H0PWB11VJD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const rtdb = getDatabase(app);