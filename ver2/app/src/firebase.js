import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAWUhGDuzGw_hdy7kUkkBqF7zxn131B9Kc",
    authDomain: "live-chat-1d807.firebaseapp.com",
    databaseURL: "https://live-chat-1d807-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "live-chat-1d807",
    storageBucket: "live-chat-1d807.firebasestorage.app",
    messagingSenderId: "306969688485",
    appId: "1:306969688485:web:3e283c3c35271560a8904c",
    measurementId: "G-CSRHEZFEVT"
  };

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.setPersistence(auth.Auth.Persistence.SESSION);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db, signInWithPopup, signOut};