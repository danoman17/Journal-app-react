// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNbNdAooX3XrOJGUXxKL0WW1-Xs2EzucQ",
    authDomain: "react-cursos-7db76.firebaseapp.com",
    projectId: "react-cursos-7db76",
    storageBucket: "react-cursos-7db76.appspot.com",
    messagingSenderId: "269625781041",
    appId: "1:269625781041:web:8150edb651ceb108cb1e10"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp );
