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
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import {db} from '@/firebase';

export const docRef = path => doc(db, path)


// const incrementDoc = (transaction, name) => {
//
//   return transaction.get(incrementDocRef)
//     .then((incrementDoc) => {
//       if (!incrementDoc.exists) {
//         throw name + " incrementDoc Document does not exist!";
//       }
//
//       const incremented = incrementDoc.data().increment + 1;
//       transaction.update(incrementDocRef, {increment: incremented});
//       return incremented;
//     })
// }

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

        // return setDoc(docRef(`${collectionName}/${item.id}`), rest)
        //   .catch(err => console.error(item.id, err))
      })
    )
}

// dbMigration()

export const fetchDocs = (name, {id = null, filter = null} = {}) => {
  if (id) {
    return getDoc(docRef(`${name}/${id}`)).then(doc => ([{...doc.data(), id: doc.id}]))
  }

  if (filter) {
    return getDocs(query(collection(db, name), filter))
      .then(snapshot => snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
  }

  return getDocs(collection(db, name)).then(snapshot => snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
}
export const upsertDoc = async (name, payloads, {increment, timestamp = true} = {}) => {
  if (!Array.isArray(payloads)) payloads = [payloads]

  const serverTime = serverTimestamp()
  const localTime = new Date()

  let items = payloads.map(payload => {
    const {id, ...fields} = payload

    if (timestamp) {
      if (!fields.createdAt) fields.createdAt = localTime
      fields.updatedAt = localTime
    }

    const newDocRef = id ? docRef(`${name}/${id}`) : doc(collection(db, name))

    return {fields, newDocRef}
  })

  if (increment) {
    const incrementDocRef = docRef(`--stats--/${name}`)

    const {oldNumber} = await runTransaction(db, async (transaction) => {
      const incrementDoc = await transaction.get(incrementDocRef);

      if (!incrementDoc.exists()) throw "Document does not exist!";

      const oldNumber = incrementDoc.data().increment

      const newNumber = oldNumber + items.length;

      transaction.update(incrementDocRef, {increment: newNumber});

      return {oldNumber, newNumber}
    })

    items = items.map((item, i) => {
      item.fields.number = oldNumber + i + 1
      return item
    })
  }

  const batch = writeBatch(db);

  items.forEach(({fields, newDocRef}) => {
    const {createdAt, updatedAt, ...rest} = fields

    const payload = rest

    if (createdAt) payload.createdAt = serverTime
    if (updatedAt) payload.updatedAt = serverTime

    batch.set(newDocRef, payload);
  })

  await batch.commit()

  return items.map(({fields, newDocRef}) => ({...fields, id: newDocRef.id}))
  //
  // const payload = payloads
  //
  // const {id, ...fields} = payload
  //
  // if (id) {
  //   return setDoc(docRef(`${name}/${id}`), fields)
  //     .then(() => fetchDocs(name, {id}))
  //     .then(([item]) => item)
  // }
  //
  // const incrementDocRef = docRef(`--stats--/${name}`)
  // const newDocRef = doc(collection(db, name))
  //
  //
  // return runTransaction(db, async (transaction) => {
  //   if (increment) {
  //     const incrementDoc = await transaction.get(incrementDocRef);
  //
  //     if (!incrementDoc.exists()) throw "Document does not exist!";
  //
  //     const number = incrementDoc.data().increment + 1;
  //
  //     transaction.update(incrementDocRef, {increment: number});
  //     fields.number = number
  //   }
  //
  //   return transaction.set(newDocRef, fields)
  // })
  //   .then(docRef => fetchDocs(name, {id: newDocRef.id}))
  //   .then(([item]) => item)
// fetchDocs(name, {id: docRef.id})
//     .then(([item]) => item)

  // return runTransaction(db, transaction => {
  //   return (increment ? incrementDoc(transaction, name) : Promise.resolve())
  //     .then(number => {
  //       if (number) fields.number = number
  //
  //       return addDoc(collection(db, name), fields)
  //         .then(docRef => fetchDocs(name, {id: docRef.id}))
  //         .then(([item]) => item)
  //     })
  // })
}
export const removeDoc = (name, id) => {
  return deleteDoc(docRef(`${name}/${id}`))
}