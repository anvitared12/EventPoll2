// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrqtwyJSSy0pW7HR8_vIrqwnaKwqjlzUo",
  authDomain: "eventpoll-98952.firebaseapp.com",
  projectId: "eventpoll-98952",
  storageBucket: "eventpoll-98952.firebasestorage.app",
  messagingSenderId: "566007666664",
  appId: "1:566007666664:web:c398eb306673dbd920b65d",
  measurementId: "G-2L5BBCMMBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);