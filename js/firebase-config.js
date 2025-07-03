// // js/firebase-config.js
// // Initialize Firebase
// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_PROJECT_ID.appspot.com",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // Get a reference to the Firestore database
// const db = firebase.firestore();



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQXvvXgTbCRp05deh0jk67XQsZZsCdBJo",
  authDomain: "phantasie-48e41.firebaseapp.com",
  projectId: "phantasie-48e41",
  storageBucket: "phantasie-48e41.firebasestorage.app",
  messagingSenderId: "908819182840",
  appId: "1:908819182840:web:ff4b09f45dbc68049eb70d",
  measurementId: "G-CMNCVWWW4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);