import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "spock-98c83.firebaseapp.com",
  projectId: "spock-98c83",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
