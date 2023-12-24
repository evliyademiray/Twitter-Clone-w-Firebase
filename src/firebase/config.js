// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0ksE9OIQt-ocf9lNn5ctxIY3LpyQvMFA",
  authDomain: "twitter-clone-4c04b.firebaseapp.com",
  projectId: "twitter-clone-4c04b",
  storageBucket: "twitter-clone-4c04b.appspot.com",
  messagingSenderId: "649388273275",
  appId: "1:649388273275:web:81d1d3d0cebbd88935fcde",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth alanının referansını alma
export const auth = getAuth(app);

//google sağlayıcısı oluşturma
export const provider = new GoogleAuthProvider();

//Veritabanı alanının referansını alma
export const db = getFirestore(app);

//Medya depolama alanının referansını alma
export const storage = getStorage(app);
