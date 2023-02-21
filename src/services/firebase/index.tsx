import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyD6NBnIQLXTzxKwngrrORsO5bJQDBgmLu8",
  authDomain: "checked-cbfcf.firebaseapp.com",
  projectId: "checked-cbfcf",
  storageBucket: "checked-cbfcf.appspot.com",
  messagingSenderId: "42492759826",
  appId: "1:42492759826:web:696e30970a0de8e91dadcb",
  measurementId: "G-933MMJ8FE4",
});

export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);
