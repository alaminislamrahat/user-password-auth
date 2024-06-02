// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNpzFxzcSRAgjhYmTpCLEW5h6MNIevFY4",
  authDomain: "user-password-aut.firebaseapp.com",
  projectId: "user-password-aut",
  storageBucket: "user-password-aut.appspot.com",
  messagingSenderId: "637670347440",
  appId: "1:637670347440:web:6cd9f0bef4db0adbebe175"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
const auth = getAuth(app);

export default auth;