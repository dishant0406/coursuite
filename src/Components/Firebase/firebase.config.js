import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVBsljz5mapve2dwRlG715ftY-gGDjHdk",
  authDomain: "repomanagement-66868.firebaseapp.com",
  projectId: "repomanagement-66868",
  storageBucket: "repomanagement-66868.appspot.com",
  messagingSenderId: "201762735158",
  appId: "1:201762735158:web:40ce8e1523820209300497"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();