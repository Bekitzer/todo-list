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

export {where}

export const OPERATIONS = {
  SET: 'set',
  UPDATE: 'update',
  DELETE: 'delete',
}

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
const groupByKey = (list, key) => {
  return list.reduce((hash, obj) => ({...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj)}), {})
}

const batchIncrement = (name, items) => {
  const incrementDocRef = docRef(`--stats--/${name}`)

  return runTransaction(db, async (transaction) => {
    const incrementDoc = await transaction.get(incrementDocRef);

    if (!incrementDoc.exists()) throw "Document does not exist!";

    const oldNumber = incrementDoc.data().increment

    const newNumber = oldNumber + items.length;

    transaction.update(incrementDocRef, {increment: newNumber});

    return {oldNumber, newNumber}
  })
}

export const fetchDocs = (options = {}) => {
  const {DEFAULT_COLLECTION, id = null, filter = null} = options

  if (id) {
    return getDoc(docRef(`${DEFAULT_COLLECTION}/${id}`)).then(doc => ([{...doc.data(), id: doc.id}]))
  }

  if (filter) {
    return getDocs(query(collection(db, DEFAULT_COLLECTION), filter))
      .then(snapshot => snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
  }

  return getDocs(collection(db, DEFAULT_COLLECTION))
    .then(snapshot => snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
}

export const writeDoc = async (payloads, options = {}) => {
  if (!Array.isArray(payloads)) payloads = [payloads]

  const {DEFAULT_COLLECTION, DEFAULT_OPERATION, INCREMENT, TIMESTAMPS = true} = options

  payloads = payloads.map(payload => ({
    ...payload,
    COLLECTION: payload.COLLECTION || DEFAULT_COLLECTION,
    OPERATION: payload.OPERATION || DEFAULT_OPERATION
  }))

  const serverTime = serverTimestamp()
  const localTime = new Date()

  const collections = groupByKey(payloads, 'COLLECTION') // e.g. {users: [...]}

  Object.keys(collections)
    .forEach(name =>
      collections[name] = groupByKey(collections[name], 'OPERATION')) // e.g. {users: {delete: [...]}}


  await Promise.all(Object.keys(collections).map(name => {
    if (!collections[name][OPERATIONS.SET]?.length || !INCREMENT) return Promise.resolve()

    const newDocs = collections[name][OPERATIONS.SET].filter(({id}) => !id)

    return batchIncrement(name, newDocs)
      .then(({oldNumber}) =>
        collections[name][OPERATIONS.SET]
          .forEach((payload, i) => {
            payload.number = oldNumber + i + 1
          }))
  }))

  const batch = writeBatch(db);

  Object.keys(collections).forEach(name => Object.keys(collections[name]).forEach(operation => {
    collections[name][operation] = collections[name][operation].map(payload => {

      const {COLLECTION, OPERATION, id, ...fields} = payload

      if (TIMESTAMPS) {
        if (!payload.createdAt) payload.createdAt = localTime
        payload.updatedAt = localTime
      }

      const newDocRef = id ? docRef(`${COLLECTION}/${id}`) : doc(collection(db, COLLECTION))

      if (fields.createdAt) fields.createdAt = serverTime
      if (fields.updatedAt) fields.updatedAt = serverTime

      batch[OPERATION](newDocRef, fields);

      return {...fields, id: newDocRef.id}
    })
  }))

  await batch.commit()

  return collections
}

export const removeDoc = (name, id) => {
  return deleteDoc(docRef(`${name}/${id}`))
}