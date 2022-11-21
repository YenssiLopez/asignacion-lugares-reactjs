// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzQxyz7WTdDFGllcVFRy4oFmjsKgdtMfs",
  authDomain: "react-cursos-66066.firebaseapp.com",
  projectId: "react-cursos-66066",
  storageBucket: "react-cursos-66066.appspot.com",
  messagingSenderId: "674830610449",
  appId: "1:674830610449:web:c6415fbc407c3e0e66c1b0"
};

// Initialize Firebase
export const Firebaseapp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth (Firebaseapp);
export const FirebaseDB = getFirestore(Firebaseapp);
