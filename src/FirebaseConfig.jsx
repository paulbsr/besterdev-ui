// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwDLcoI45eQU61Y7GVXlBDAx-3Du_gQuA",
  authDomain: "besterdev-432e9.firebaseapp.com",
  projectId: "besterdev-432e9",
  storageBucket: "besterdev-432e9.appspot.com",
  messagingSenderId: "352042484093",
  appId: "1:352042484093:web:3b62f25c3b000848720c14",
  measurementId: "G-FCGGY1NE36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);