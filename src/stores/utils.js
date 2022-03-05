import {getDoc, addDoc, collection, deleteDoc, doc, getDocs, setDoc, query, where} from 'firebase/firestore';
import db from '@/firebase';

export {where}

export const upsertDoc = (name, {id, ...item}) => {
  if (id) {
    return setDoc(doc(db, name, id), item)
  }
  return addDoc(collection(db, name), item)
}
export const removeDoc = (name, id) => {
  return deleteDoc(doc(db, name, id))
}
export const fetchDocs = (name, {id = null, filter = null} = {}) => {
  // let ordersRef = db.collection('orders')
  // if (!state.user?.isAdmin) {
  //   ordersRef = ordersRef.where('orderSupplierRef', '==', state.user?.userSupplierRef)
  // }
  // ordersRef.get().then(querySnapshot => {
  //
  // }

  if (id) {
    return getDoc(doc(db, name, id)).then(doc => ([{...doc.data(), id: doc.id}]))
  }

  if (filter) {
    return getDocs(query(collection(db, name), filter)).then(snapshot => snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })))
  }

  return getDocs(collection(db, name)).then(snapshot => snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
}