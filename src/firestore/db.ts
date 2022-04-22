import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfigDev = {
  apiKey: "AIzaSyDq-PJ4QO5cUOj8KkICXypdMWI_jhQPYjQ",
  authDomain: "dnd-companion-f9c2e.firebaseapp.com",
  projectId: "dnd-companion-f9c2e",
  storageBucket: "dnd-companion-f9c2e.appspot.com",
  messagingSenderId: "888652739053",
  appId: "1:888652739053:web:0f60c0d6a35be6cdcfb7e4",
  measurementId: "G-GN6W73E8PH",
};

export const db = firebase.initializeApp(firebaseConfigDev).firestore();
