// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-9805941607-e5de5",
  "appId": "1:142363889995:web:b27ae4c58665cc46b298ce",
  "storageBucket": "studio-9805941607-e5de5.firebasestorage.app",
  "apiKey": "AIzaSyBaGlPO49nfCuID5hxJjYY-Hw5Ju1gIYM4",
  "authDomain": "studio-9805941607-e5de5.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "142363889995"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
