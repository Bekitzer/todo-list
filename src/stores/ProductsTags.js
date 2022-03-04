import firebase from 'firebase/compat';
import {addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc} from 'firebase/firestore';
import db from '@/firebase'

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    deleteProductTag(state, id) {
      state.list = state.list.filter(item => item.id !== id)
    },
    upsertProductTag(state, payload) {
      let found = false

      let items = state.list.map(item => {
        if (item.id === payload.id) found = true

        return found ? payload : item
      })

      if (!found) items = state.list.concat(payload)

      state.list = items
    },
    setProductsTags(state, items) {
      if(!Array.isArray(items)) items = [items]

      state.list = state.list.concat(...items)
    }
  },
  actions: {
    addProductTag({commit}, payload) {
      return addDoc(collection(db, 'products-tags'), payload)
        .then(docRef => {
          commit('setProductsTags', {...payload, id: docRef.id})
          commit('showSnackbar', 'תגית חדשה נוספה!')
        })
        .catch(error => {
          console.error('Something went wrong - addProductTag', error);
        })
    },
    deleteProductTag({commit}, id) {
      deleteDoc(doc(db, 'products-tags', id))
        .then(() => {
          commit('deleteProductTag', id)
          commit('showSnackbar', 'תגית נמחקה!')
        })
        .catch(error => {
          console.error('Something went wrong - deleteProductTag', error);
        })
    },
    updateProductTag({commit}, payload) {
      const {id, ...rest} = payload
      updateDoc(doc(db, 'products-tags', id), rest)
        .then(() => {
          commit('upsertProductTag', payload)
          commit('showSnackbar', 'תגית עודכנה!')
        })
        .catch((error) => {
          console.error('Something went wrong - updateProductTag', error);
        })
    },
    getProductsTags({commit, rootGetters}) {
      if (!rootGetters.user?.isAdmin) return console.debug('not pulling products tags since no admin role')

      return getDocs(collection(db, 'products-tags'))
        .then(querySnapshot => {
          const items = [];
          querySnapshot.forEach(doc => {
            items.push({...doc.data(), id: doc.id})
          })
          commit('setProductsTags', items)
        })
        .catch(error => {
          console.error('Something went wrong - getProductsTags', error);
        })
    },
    setProductsTags({commit}, items) {
      setDoc(doc(collection(db, 'products-tags')), items)
        .then(() => {
          commit('setProductsTags', items)
        })
        .catch((error) => {
          console.error('Something went wrong - setProductsTags', error);
        })
    },
  },
  modules: {}
}