import firebase from 'firebase/compat';
import {collection, deleteDoc, doc, setDoc, updateDoc} from 'firebase/firestore';
import db from '@/firebase'

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    deleteOrder(state, id) {
      state.list = state.list.filter(item => item.id !== id)
    },
    upsertOrder(state, payload) {
      let found = false

      let items = state.list.map(item => {
        if (item.id === payload.id) found = true

        return found ? payload : item
      })

      if (!found) items = state.list.concat(payload)

      state.list = items
    },
    setOrders(state, items) {
      if(!Array.isArray(items)) items = [items]

      state.list = state.list.concat(...items)
    }
  },
  actions: {
    addOrder({commit}, order) {
      const incrementDocRef = db.collection('--stats--').doc('orders');

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
            let isOrder = {
              ...order,
              number: number,
              orderCreationDate: firebase.firestore.FieldValue.serverTimestamp(),
              orderUpdated: null
            }
            await setDoc(doc(collection(db, "orders")), isOrder)
            commit('setOrders', isOrder)
            commit('showSnackbar', 'ספק חדש נוסף!')
          }).catch((error) => {
            console.log('Something went wrong - addOrder', error);
          })
      })
    },
    deleteOrder({commit}, id) {
      deleteDoc(doc(db, "orders", id)).then(() => {
        commit('deleteOrder', id)
        commit('showSnackbar', 'ספק נמחק!')
      }).catch((error) => {
        console.log('Something went wrong - deleteOrder', error);
      })
    },
    updateOrder({commit}, payload) {
      const {removeUsersIds, usersIds, ...order} = payload
      // TODO: batch those requests to a transaction
      updateDoc(doc(db, "orders", order.id), order)
        .then(() => Promise.all(removeUsersIds.map(userId => {
          return updateDoc(doc(db, "users", userId), {userOrderRef: null})
        })))
        .then(() => Promise.all(usersIds.map(userId => {
          return updateDoc(doc(db, "users", userId), {userOrderRef: db.doc(`orders/${order.id}`)})
        })))
        .then(() => {
          commit('upsertOrder', order)
          removeUsersIds.map(id => commit('updateUser', {id, userOrderRef: null}))
          usersIds.map(id => commit('updateUser', {id, userOrderRef: db.doc(`orders/${order.id}`)}))
          commit('showSnackbar', 'ספק עודכן!')
        })
        .catch((error) => {
          console.log('Something went wrong - updateOrder & updateUser', error);
        })
    },
    getOrders({commit, rootGetters}) {
      if (!rootGetters.user?.isAdmin) return console.debug('not pulling orders since no admin role')

      return db.collection('orders').get().then(querySnapshot => {
        const orders = [];
        querySnapshot.forEach(doc => {
          orders.push({...doc.data(), id: doc.id})
        })
        commit('setOrders', orders)
      }).catch((error) => {
        console.log('Something went wrong - getOrders', error);
      })
    },
    getOrder({commit, rootGetters}) {
      if (rootGetters.user?.userOrderRef) {
        rootGetters.user.userOrderRef.get().then(doc => {
          commit('upsertOrder', {...doc.data(), id: doc.id})
        }).catch((error) => {
          console.log('Something went wrong - getOrder', error);
        })
      }
    },
    setOrders({commit}, orders) {
      setDoc(doc(collection(db, "orders")), orders).then(() => {
        commit('setOrders', orders)
      }).catch((error) => {
        console.log('Something went wrong - setOrders', error);
      })
    },
  },
  modules: {}
}