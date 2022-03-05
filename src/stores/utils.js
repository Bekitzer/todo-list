import {
  getDoc,
  getDocs,
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  query,
  where,
  runTransaction,
  serverTimestamp
} from 'firebase/firestore';
import db from '@/firebase';

const incrementDoc = (transaction, name) => {
  const incrementDocRef = doc(db, '--stats--', name)

  return transaction.get(incrementDocRef)
    .then((incrementDoc) => {
      if (!incrementDoc.exists) {
        throw name + " incrementDoc Document does not exist!";
      }

      const incremented = incrementDoc.data().increment + 1;
      transaction.update(incrementDocRef, {increment: incremented});
      return incremented;
    })
}

export {where}

export const upsertDoc = (name, {id, ...item}, {increment, timestamp} = {timestamp: true}) => {
  if (timestamp) {
    if (id) item.updatedAt = serverTimestamp()
    else item.createdAt = serverTimestamp()
  }

  // clientCreationDate - clientUpdated
  // supplierCreationDate - supplierUpdated
  // orderCreationDate - orderUpdated
  // productCreationDate - productUpdated

  // if(doc.data().id === "zeBBSwcFbL9JxPRKcJB8") {
    // const sup = doc.data()
    // const {clientName, ...rest} = sup
    // console.log(doc.ref.set(rest))
    // if(clientName) {
    //   console.log(doc.ref.set({orderClientRef: db.doc(`clients/${clientName}`), ...rest}))
    // }
    // }

  if (id) {
    return setDoc(doc(db, name, id), item)
  }

  return runTransaction(db, transaction => {
    return (increment ? incrementDoc(transaction, name) : Promise.resolve())
      .then(number => {
        if (number) item.number = number

        return addDoc(collection(db, name), item)
      })
  })
}
export const removeDoc = (name, id) => {
  return deleteDoc(doc(db, name, id))
}
export const fetchDocs = (name, {id = null, filter = null} = {}) => {
  if (id) {
    return getDoc(doc(db, name, id)).then(doc => ([{...doc.data(), id: doc.id}]))
  }

  if (filter) {
    return getDocs(query(collection(db, name), filter))
      .then(snapshot => snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
  }

  return getDocs(collection(db, name)).then(snapshot => snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
}