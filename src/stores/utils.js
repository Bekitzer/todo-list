import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc as update} from 'firebase/firestore';
import db from '@/firebase';

export const createDoc = (name, item) => {
  return addDoc(collection(db, name), item)
}
export const updateDoc = (name, {id, ...item}) => {
  return update(doc(db, name, id), item)
}
export const removeDoc = (name, id) => {
  return deleteDoc(doc(db, name, id))
}

export const fetchDocs = (name) => {
  return getDocs(collection(db, name))
}