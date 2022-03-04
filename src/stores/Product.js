import firebase from 'firebase/compat';
import {collection, deleteDoc, doc, setDoc, updateDoc} from 'firebase/firestore';
import db from '@/firebase'

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    deleteProduct(state, id) {
      state.list = state.list.filter(item => item.id !== id)
    },
    upsertProduct(state, payload) {
      let found = false

      let items = state.list.map(item => {
        if (item.id === payload.id) found = true

        return found ? payload : item
      })

      if (!found) items = state.list.concat(payload)

      state.list = items
    },
    setProducts(state, items) {
      if(!Array.isArray(items)) items = [items]

      state.list = state.list.concat(...items)
    },
    // Attributes
    setAttributes(state, attributes) {
      state.attributes = attributes
    },
  },
  actions: {
    addProduct({commit}, product) {
      const incrementDocRef = db.collection('--stats--').doc('products');

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
            let isProduct = {
              ...product,
              number: number,
              productCreationDate: firebase.firestore.FieldValue.serverTimestamp(),
              productUpdated: null
            }
            await setDoc(doc(collection(db, "products")), isProduct)
            commit('setProducts', isProduct)
            commit('showSnackbar', 'ספק חדש נוסף!', { root: true })
          }).catch((error) => {
            console.log('Something went wrong - addProduct', error);
          })
      })
    },
    deleteProduct({commit}, id) {
      deleteDoc(doc(db, "products", id)).then(() => {
        commit('deleteProduct', id)
        commit('showSnackbar', 'ספק נמחק!', { root: true })
      }).catch((error) => {
        console.log('Something went wrong - deleteProduct', error);
      })
    },
    updateProduct({commit}, payload) {
      const {removeUsersIds, usersIds, ...product} = payload
      // TODO: batch those requests to a transaction
      updateDoc(doc(db, "products", product.id), product)
        .then(() => Promise.all(removeUsersIds.map(userId => {
          return updateDoc(doc(db, "users", userId), {userProductRef: null})
        })))
        .then(() => Promise.all(usersIds.map(userId => {
          return updateDoc(doc(db, "users", userId), {userProductRef: db.doc(`products/${product.id}`)})
        })))
        .then(() => {
          commit('upsertProduct', product)
          removeUsersIds.map(id => commit('updateUser', {id, userProductRef: null}))
          usersIds.map(id => commit('updateUser', {id, userProductRef: db.doc(`products/${product.id}`)}))
          commit('showSnackbar', 'ספק עודכן!', { root: true })
        })
        .catch((error) => {
          console.log('Something went wrong - updateProduct & updateUser', error);
        })
    },
    getProducts({commit, rootGetters}) {
      if (!rootGetters.user?.isAdmin) return console.debug('not pulling products since no admin role')

      return db.collection('products').get().then(querySnapshot => {
        const products = [];
        querySnapshot.forEach(doc => {
          products.push({...doc.data(), id: doc.id})
        })
        commit('setProducts', products)
      }).catch((error) => {
        console.log('Something went wrong - getProducts', error);
      })
    },
    getProduct({commit, rootGetters}) {
      if (rootGetters.user?.userProductRef) {
        rootGetters.user.userProductRef.get().then(doc => {
          commit('upsertProduct', {...doc.data(), id: doc.id})
        }).catch((error) => {
          console.log('Something went wrong - getProduct', error);
        })
      }
    },
    setProducts({commit}, products) {
      setDoc(doc(collection(db, "products")), products).then(() => {
        commit('setProducts', products)
      }).catch((error) => {
        console.log('Something went wrong - setProducts', error);
      })
    },
    // Attributes
    updateAttributes({commit}, payload) {
      updateDoc(doc(db, "products", payload.id), {attributes: payload.attributes})
        .then(() => {
          commit('setAttributes', payload.attributes)
          commit('showSnackbar', 'מאפיינים עודכנו!', { root: true })
        })
        .catch(error => {
          console.error('Something went wrong - updateAttributes', error);
        })
    },
  },
  modules: {}
}