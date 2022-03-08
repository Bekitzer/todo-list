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
import {db} from '@/firebase';

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

function dbMigration() {
  const ifYouKnowWhatYouAreDoing = false
  if (!ifYouKnowWhatYouAreDoing) throw 'Stop right now you stupid f***'

  const collectionName = 'XXX'
  return getDocs(collection(db, collectionName))
    .then(snapshot => snapshot.docs.forEach(item => {

        if (item.id !== "xzz") return

        const {firstFieldToRemove, firstFieldToRename, secondFieldToRename, ...rest} = item.data()

        if (firstFieldToRename) {
          rest.firstRenamedField = firstFieldToRename
        }

        if (secondFieldToRename) {
          rest.secondRenamedField = secondFieldToRename
        }

        // console.log(item.id)
        // console.log(rest)

        // return setDoc(doc(db, collectionName, item.id), rest)
        //   .catch(err => console.error(item.id, err))
      })
    )
}

// dbMigration()

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
export const upsertDoc = (name, {id, ...payload}, {increment, timestamp = true} = {}) => {
  if (timestamp) {
    if (!payload.createdAt) payload.createdAt = serverTimestamp()
    payload.updatedAt = serverTimestamp()
  }

  if (id) {
    return setDoc(doc(db, name, id), payload)
      .then(() => fetchDocs(name, {id}))
      .then(([item]) => item)
  }

  return runTransaction(db, transaction => {
    return (increment ? incrementDoc(transaction, name) : Promise.resolve())
      .then(number => {
        if (number) payload.number = number

        return addDoc(collection(db, name), payload)
          .then(docRef => fetchDocs(name, {id: docRef.id}))
          .then(([item]) => item)
      })
  })
}
export const removeDoc = (name, id) => {
  return deleteDoc(doc(db, name, id))
}