import firebase from 'firebase/compat';
import {collection, deleteDoc, doc, setDoc, updateDoc} from 'firebase/firestore';
import db from '@/firebase'

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    deleteSupplier(state, id) {
      state.list = state.list.filter(item => item.id !== id)
    },
    upsertSupplier(state, payload) {
      let found = false

      let items = state.list.map(item => {
        if (item.id === payload.id) found = true

        return found ? payload : item
      })

      if (!found) items = state.list.concat(payload)

      state.list = items
    },
    setSuppliers(state, items) {
      if(!Array.isArray(items)) items = [items]

      state.list = state.list.concat(...items)
    }
  },
  actions: {
    addSupplier({commit}, supplier) {
      const incrementDocRef = db.collection('--stats--').doc('suppliers');

      db.runTransaction((transaction) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction
          .get(incrementDocRef)
          .then((incrementDoc) => {
            if (!incrementDoc.exists) {
              throw "Document does not exist!";
            }

            const incremented = incrementDoc.data().increment + 1;
            transaction.update(incrementDocRef, {increment: incremented});
            return incremented;
          })
          .then(async (number) => {
            let isSupplier = {
              ...supplier,
              number: number,
              supplierCreationDate: firebase.firestore.FieldValue.serverTimestamp(),
              supplierUpdated: null
            }
            await setDoc(doc(collection(db, "suppliers")), isSupplier)
            commit('setSuppliers', isSupplier)
            commit('showSnackbar', 'ספק חדש נוסף!', { root: true })
          }).catch((error) => {
            console.log('Something went wrong - addSupplier', error);
          })
      })
    },
    deleteSupplier({commit}, id) {
      deleteDoc(doc(db, "suppliers", id)).then(() => {
        commit('deleteSupplier', id)
        commit('showSnackbar', 'ספק נמחק!', { root: true })
      }).catch((error) => {
        console.log('Something went wrong - deleteSupplier', error);
      })
    },
    updateSupplier({commit}, payload) {
      const {removeUsersIds, usersIds, ...supplier} = payload
      // TODO: batch those requests to a transaction
      updateDoc(doc(db, "suppliers", supplier.id), supplier)
        .then(() => Promise.all(removeUsersIds.map(userId => {
          return updateDoc(doc(db, "users", userId), {userSupplierRef: null})
        })))
        .then(() => Promise.all(usersIds.map(userId => {
          return updateDoc(doc(db, "users", userId), {userSupplierRef: db.doc(`suppliers/${supplier.id}`)})
        })))
        .then(() => {
          commit('upsertSupplier', supplier)
          removeUsersIds.map(id => commit('updateUser', {id, userSupplierRef: null}))
          usersIds.map(id => commit('updateUser', {id, userSupplierRef: db.doc(`suppliers/${supplier.id}`)}))
          commit('showSnackbar', 'ספק עודכן!', { root: true })
        })
        .catch((error) => {
          console.log('Something went wrong - updateSupplier & updateUser', error);
        })
    },
    getSuppliers({commit, rootGetters}) {
      if (!rootGetters.user?.isAdmin) return console.debug('not pulling suppliers since no admin role')

      return db.collection('suppliers').get().then(querySnapshot => {
        const suppliers = [];
        querySnapshot.forEach(doc => {
          suppliers.push({...doc.data(), id: doc.id})
        })
        commit('setSuppliers', suppliers)
      }).catch((error) => {
        console.log('Something went wrong - getSuppliers', error);
      })
    },
    getSupplier({commit, rootGetters}) {
      if (rootGetters.user?.userSupplierRef) {
        rootGetters.user.userSupplierRef.get().then(doc => {
          commit('upsertSupplier', {...doc.data(), id: doc.id})
        }).catch((error) => {
          console.log('Something went wrong - getSupplier', error);
        })
      }
    },
    setSuppliers({commit}, suppliers) {
      setDoc(doc(collection(db, "suppliers")), suppliers).then(() => {
        commit('setSuppliers', suppliers)
      }).catch((error) => {
        console.log('Something went wrong - setSuppliers', error);
      })
    },
  },
  modules: {}
}