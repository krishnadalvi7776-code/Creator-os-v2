import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCvzbQlDx3vMh0hiwf-GHutrEWqjjTfmko",
  authDomain: "creator-os-1102f.firebaseapp.com",
  projectId: "creator-os-1102f",
  storageBucket: "creator-os-1102f.appspot.com",
  messagingSenderId: "167299960924",
  appId: "1:167299960924:web:e345a830b95b6e23335699"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
};