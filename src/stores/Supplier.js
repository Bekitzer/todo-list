import {upsertDoc, fetchDocs, removeDoc} from '@/stores/utils';

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    initialize(state, payloads) {
      state.list = payloads
    },
    remove(state, id) {
      state.list = state.list.filter(item => item.id !== id)
    },
    upsert(state, payloads) {
      if (!Array.isArray(payloads)) payloads = [payloads]

      let items = [...state.list]

      payloads.forEach(payload => {
        let found = false

        items = items.map(item => {
          if (item.id === payload.id) found = true

          return found ? payload : item
        })

        if (!found) items = items.concat(payload)
      })

      state.list = items
    }
  },
  actions: {
    upsert({commit}, payload) {
      upsertDoc('suppliers', payload)
        .then(docRef => commit('upsert', {...payload, id: docRef.id}))
        .then(() => commit('showSnackbar', 'ספק נשמר!', {root: true}))
        .catch(err => console.error('Something went wrong - Supplier.upsert', err))
    },
    remove({commit}, id) {
      return removeDoc('suppliers', id)
        .then(() => commit('remove', id))
        .then(() => commit('showSnackbar', 'ספק נמחק!', {root: true}))
        .catch(err => console.error('Something went wrong - Supplier.remove', err))
    },
    fetch({commit, rootGetters}) {
      const id = rootGetters.user?.isAdmin ? null : rootGetters.user?.userSupplierRef?.id

      return fetchDocs('suppliers', {id})
        .then(docs => commit('initialize', docs))
        .catch(err => console.error('Something went wrong - Supplier.fetch', err))
    }
  },
  modules: {}
}


// addSupplier({commit}, supplier) {
//   const incrementDocRef = db.collection('--stats--').doc('suppliers');

//   db.runTransaction((transaction) => {
//     // This code may get re-run multiple times if there are conflicts.
//     return transaction
//       .get(incrementDocRef)
//       .then((incrementDoc) => {
//         if (!incrementDoc.exists) {
//           throw "Document does not exist!";
//         }

//         const incremented = incrementDoc.data().increment + 1;
//         transaction.update(incrementDocRef, {increment: incremented});
//         return incremented;
//       })
//       .then(async (number) => {
//         let isSupplier = {
//           ...supplier,
//           number: number,
//           supplierCreationDate: firebase.firestore.FieldValue.serverTimestamp(),
//           supplierUpdated: null
//         }
//         await setDoc(doc(collection(db, "suppliers")), isSupplier)
//         commit('setSuppliers', isSupplier)
//         commit('showSnackbar', 'ספק חדש נוסף!', { root: true })
//       }).catch((error) => {
//         console.log('Something went wrong - addSupplier', error);
//       })
//   })
// },
// updateSupplier({commit}, payload) {
//   const {removeUsersIds, usersIds, ...supplier} = payload
//   // TODO: batch those requests to a transaction
//   updateDoc(doc(db, "suppliers", supplier.id), supplier)
//     .then(() => Promise.all(removeUsersIds.map(userId => {
//       return updateDoc(doc(db, "users", userId), {userSupplierRef: null})
//     })))
//     .then(() => Promise.all(usersIds.map(userId => {
//       return updateDoc(doc(db, "users", userId), {userSupplierRef: db.doc(`suppliers/${supplier.id}`)})
//     })))
//     .then(() => {
//       commit('upsertSupplier', supplier)
//       removeUsersIds.map(id => commit('updateUser', {id, userSupplierRef: null}))
//       usersIds.map(id => commit('updateUser', {id, userSupplierRef: db.doc(`suppliers/${supplier.id}`)}))
//       commit('showSnackbar', 'ספק עודכן!', { root: true })
//     })
//     .catch((error) => {
//       console.log('Something went wrong - updateSupplier & updateUser', error);
//     })
// },