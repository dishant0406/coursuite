import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBVBsljz5mapve2dwRlG715ftY-gGDjHdk",
//   authDomain: "repomanagement-66868.firebaseapp.com",
//   projectId: "repomanagement-66868",
//   storageBucket: "repomanagement-66868.appspot.com",
//   messagingSenderId: "201762735158",
//   appId: "1:201762735158:web:40ce8e1523820209300497"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyDwHVJpApMgqxqjGGNkaTXcTmgteWv-VQc",
//   authDomain: "yellomonkewebgl.firebaseapp.com",
//   projectId: "yellomonkewebgl",
//   storageBucket: "yellomonkewebgl.appspot.com",
//   messagingSenderId: "508393349368",
//   appId: "1:508393349368:web:6d62986bd9460fab5adb0d"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBMV-Wa3AhGlfjEMOREB-k36fQ6VztOJcg",
  authDomain: "coursuite-c69b6.firebaseapp.com",
  projectId: "coursuite-c69b6",
  storageBucket: "coursuite-c69b6.appspot.com",
  messagingSenderId: "207706136446",
  appId: "1:207706136446:web:3afaddadeb1a617139dd2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();