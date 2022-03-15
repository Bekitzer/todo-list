import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDKRDIueceXgFm4DCCo6Tt1_fTiG_RQ_Uc",
  authDomain: "just-print-ngs.firebaseapp.com",
  databaseURL: "https://just-print-ngs-default-rtdb.firebaseio.com",
  projectId: "just-print-ngs",
  storageBucket: "just-print-ngs.appspot.com",
  messagingSenderId: "38410968724",
  appId: "1:38410968724:web:a56800ce30fbd46dc55e81",
  measurementId: "G-LS8EQX32HV"
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const analytics = getAnalytics(app);

export {db, storage, analytics}