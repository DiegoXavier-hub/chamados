import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD25a05nAaxqPm_oUcSO9kgLNnJkpREu7s",
    authDomain: "tickets-18293.firebaseapp.com",
    projectId: "tickets-18293",
    storageBucket: "tickets-18293.appspot.com",
    messagingSenderId: "120050610855",
    appId: "1:120050610855:web:87a19d0a4c2e26f6f1e182",
    measurementId: "G-01414ZW399"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
