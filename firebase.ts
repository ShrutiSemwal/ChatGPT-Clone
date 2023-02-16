import {getApp, getApps, initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaLtcYaiKulCOU67IOOJQu5VRmmd9VpZs",
  authDomain: "chatgpt-messenger-clone-b74c5.firebaseapp.com",
  projectId: "chatgpt-messenger-clone-b74c5",
  storageBucket: "chatgpt-messenger-clone-b74c5.appspot.com",
  messagingSenderId: "283788316647",
  appId: "1:283788316647:web:77be388366013641c6b742"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db= getFirestore(app);

export {db}