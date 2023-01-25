// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFaz5fAjpTNo66OpP8Ca1G6H2z8GgzBtU",
  authDomain: "composite-watch-374915.firebaseapp.com",
  projectId: "composite-watch-374915",
  storageBucket: "composite-watch-374915.appspot.com",
  messagingSenderId: "914309894082",
  appId: "1:914309894082:web:efcacc6b9971b85307d05b"
};



// Initialize Firebase
export const Firebaseapp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth (Firebaseapp);
export const FirebaseDB = getFirestore(Firebaseapp);
export const FirebaseSto = getStorage(Firebaseapp)
