
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider , onAuthStateChanged, signOut, signInWithPopup} from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, setDoc, doc, deleteDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHFoV3HXcUpNkBe9c8P-CsBljbym9Jk0c",
  authDomain: "w-gogoanime.firebaseapp.com",
  projectId: "w-gogoanime",
  storageBucket: "w-gogoanime.appspot.com",
  messagingSenderId: "905135347708",
  appId: "1:905135347708:web:97ca7ca091e9a486e90479",
  measurementId: "G-3RJX49HXE9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider, signInWithPopup , onAuthStateChanged, signOut, collection, query, where, getDocs, setDoc, doc, deleteDoc};