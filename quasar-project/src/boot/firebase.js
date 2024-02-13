import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBE65ScSxmb0BHj1s7c8ZrjE9wc5uQxNSI",
    authDomain: "justuse-3f508.firebaseapp.com",
    projectId: "justuse-3f508",
    storageBucket: "justuse-3f508.appspot.com",
    messagingSenderId: "263055230430",
    appId: "1:263055230430:web:84ba68f41e31484c76894f"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db }