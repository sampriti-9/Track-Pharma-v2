import { initializeApp } from "firebase/app";


import { getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBPgO0SvQqsVkTs3r1pB8e-ISZ32gmMfnI",
  authDomain: "track-pharma.firebaseapp.com",
  projectId: "track-pharma",
  databaseURL: "https://track-pharma-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "track-pharma.firebasestorage.app",
  messagingSenderId: "1071434862593",
  appId: "1:1071434862593:web:6cc3591aed8eeb1a493000"
};



const app = initializeApp(firebaseConfig);



export const db = getDatabase(app);

