// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-state-mern-9a523.firebaseapp.com",
  projectId: "real-state-mern-9a523",
  storageBucket: "real-state-mern-9a523.appspot.com",
  messagingSenderId: "958414133085",
  appId: "1:958414133085:web:eecf3adc2e968464047ab4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);