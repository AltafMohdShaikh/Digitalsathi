// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0HHJ2AKemr-kBZvdOH8FPIWnlox39e4c",
  authDomain: "digital-sathi-01.firebaseapp.com",
  projectId: "digital-sathi-01",
  storageBucket: "digital-sathi-01.firebasestorage.app",
  messagingSenderId: "908762072926",
  appId: "1:908762072926:web:61bf4c645244fd8c5eb1cf",
  measurementId: "G-W26SZ6Y6T3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Initialize AI Logic
const ai = getAI(app, { backend: new GoogleAIBackend() });
const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

export { auth, db, googleProvider, model };