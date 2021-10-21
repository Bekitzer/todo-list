import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyDKRDIueceXgFm4DCCo6Tt1_fTiG_RQ_Uc",
  authDomain: "just-print-ngs.firebaseapp.com",
  databaseURL: "https://just-print-ngs-default-rtdb.firebaseio.com",
  projectId: "just-print-ngs",
  storageBucket: "just-print-ngs.appspot.com",
  messagingSenderId: "38410968724",
  appId: "1:38410968724:web:a56800ce30fbd46dc55e81"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.settings({timestampsInSnapshots: true, merge: true});

export default db;