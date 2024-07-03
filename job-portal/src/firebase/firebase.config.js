// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4wV2gIFikTlbA4y2QXnU9ts2ObF_DSxQ",
  authDomain: "jobs-e0e30.firebaseapp.com",
  projectId: "jobs-e0e30",
  storageBucket: "jobs-e0e30.appspot.com",
  messagingSenderId: "884591059372",
  appId: "1:884591059372:web:6bf9e43035c000fc88da09",
  measurementId: "G-GF417JSVXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;

