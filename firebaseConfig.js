import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyCWIcmtz8aO6VO0SQ-xWGJrvSJJC-3GaO8",
  authDomain: "tourism-6bcdd.firebaseapp.com",
  projectId: "tourism-6bcdd",
  storageBucket: "tourism-6bcdd.appspot.com",
  messagingSenderId: "625182700661",
  appId: "1:625182700661:web:de64dc0c601b812a0f743c",
  measurementId: "G-PH4C178ZKC"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const db = app.firestore();
export {auth ,db};