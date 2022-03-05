import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyDKRDIueceXgFm4DCCo6Tt1_fTiG_RQ_Uc",
  authDomain: "just-print-ngs.firebaseapp.com",
  databaseURL: "https://just-print-ngs-default-rtdb.firebaseio.com",
  projectId: "just-print-ngs",
  storageBucket: "just-print-ngs.appspot.com",
  messagingSenderId: "38410968724",
  appId: "1:38410968724:web:a56800ce30fbd46dc55e81"
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export {db, storage}