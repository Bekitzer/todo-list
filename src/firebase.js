import * as firebase from 'firebase/app'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyDKRDIueceXgFm4DCCo6Tt1_fTiG_RQ_Uc",
  authDomain: "just-print-ngs.firebaseapp.com",
  databaseURL: "https://just-print-ngs-default-rtdb.firebaseio.com",
  projectId: "just-print-ngs",
  storageBucket: "just-print-ngs.appspot.com",
  messagingSenderId: "38410968724",
  appId: "1:38410968724:web:a56800ce30fbd46dc55e81"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()

// collection references
const taskaCollection = db.collection('tasks')
const ordersCollection = db.collection('orders')
const clientsCollection = db.collection('clients')
const suppliersCollection = db.collection('suppliers')

// export utils/refs
export {
  db,
  taskaCollection,
  ordersCollection,
  clientsCollection,
  suppliersCollection
}