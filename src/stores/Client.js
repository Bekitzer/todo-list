import firebase from 'firebase/compat';
import {collection, deleteDoc, doc, setDoc, updateDoc} from 'firebase/firestore';
import db from '@/firebase'

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    deleteClient(state, id) {
      state.list = state.list.filter(item => item.id !== id)
    },
    upsertClient(state, payload) {
      let found = false

      let items = state.list.map(item => {
        if (item.id === payload.id) found = true

        return found ? payload : item
      })

      if (!found) items = state.list.concat(payload)

      state.list = items
    },
    setClients(state, items) {
      if(!Array.isArray(items)) items = [items]

      state.list = state.list.concat(...items)
    }
  },
  actions: {
    addClient({commit}, client) {
      const incrementDocRef = db.collection('--stats--').doc('clients');

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
            let isClient = {
              ...client,
              number: number,
              clientCreationDate: firebase.firestore.FieldValue.serverTimestamp(),
              clientUpdated: null
            }
            await setDoc(doc(collection(db, "clients")), isClient)
            commit('setClients', isClient)
            commit('showSnackbar', 'לקוח חדש נוסף!', { root: true })
          }).catch((error) => {
            console.log('Something went wrong - addClient', error);
          })
      })
    },
    deleteClient({commit}, id) {
      deleteDoc(doc(db, "clients", id)).then(() => {
        commit('deleteClient', id)
        commit('showSnackbar', 'לקוח נמחק!', { root: true })
      }).catch((error) => {
        console.log('Something went wrong - deleteClient', error);
      })
    },
    updateClient({commit}, payload) {
      const {removeUsersIds, usersIds, ...client} = payload
      // TODO: batch those requests to a transaction
      updateDoc(doc(db, "clients", client.id), client)
        .then(() => Promise.all(removeUsersIds.map(userId => {
          return updateDoc(doc(db, "users", userId), {userClientRef: null})
        })))
        .then(() => Promise.all(usersIds.map(userId => {
          return updateDoc(doc(db, "users", userId), {userClientRef: db.doc(`clients/${client.id}`)})
        })))
        .then(() => {
          commit('upsertClient', client)
          removeUsersIds.map(id => commit('updateUser', {id, userClientRef: null}))
          usersIds.map(id => commit('updateUser', {id, userClientRef: db.doc(`clients/${client.id}`)}))
          commit('showSnackbar', 'לקוח עודכן!', { root: true })
        })
        .catch((error) => {
          console.log('Something went wrong - updateClient & updateUser', error);
        })
    },
    getClients({commit, rootGetters}) {
      if (!rootGetters.user?.isAdmin) return console.debug('not pulling clients since no admin role')

      return db.collection('clients').get().then(querySnapshot => {
        const clients = [];
        querySnapshot.forEach(doc => {
          clients.push({...doc.data(), id: doc.id})
        })
        commit('setClients', clients)
      }).catch((error) => {
        console.log('Something went wrong - getClients', error);
      })
    },
    getClient({commit, rootGetters}) {
      if (rootGetters.user?.userClientRef) {
        rootGetters.user.userClientRef.get().then(doc => {
          commit('upsertClient', {...doc.data(), id: doc.id})
        }).catch((error) => {
          console.log('Something went wrong - getClient', error);
        })
      }
    },
    setClients({commit}, clients) {
      setDoc(doc(collection(db, "clients")), clients).then(() => {
        commit('setClients', clients)
      }).catch((error) => {
        console.log('Something went wrong - setClients', error);
      })
    },
  },
  modules: {}
}