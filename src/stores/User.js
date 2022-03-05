import {upsertDoc, fetchDocs, removeDoc} from '@/stores/utils';

// import firebase from 'firebase/compat';
// import {collection, deleteDoc, doc, setDoc, updateDoc} from 'firebase/firestore';
import db from '@/firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth} from 'firebase/auth'

const COLLECTION_NAME = 'users'
const DEFAULT_STATE = () => ({
  auth: null,
  list: []
})

export default {
  namespaced: true,
  state: DEFAULT_STATE(),
  mutations: {
    reset(state) {
      Object.assign(state, DEFAULT_STATE())
    },
    initializeAuth(state, payloads) {
      state.auth = payloads
    },
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
    resetState({commit}) {
      commit('reset')
    },
    signUp({commit}, payload) {
      return createUserWithEmailAndPassword(getAuth(), payload.email, payload.password)
        .then(({user}) => commit('initializeAuth', {...payload, uid: user.uid}))
        .then(() => getAuth().currentUser.updateProfile({displayName: payload.username}))
        .then(() => upsertDoc(COLLECTION_NAME, {payload, id: getAuth().currentUser.uid}))
        .then(() => commit('upsert', {...payload, id: getAuth().currentUser.uid}))
        .then(() => commit('showSnackbar', 'משתמש חדש נוסף!', {root: true}))
        .catch(err => console.error('Something went wrong - User.signUp', err))
    },
    signIn({commit}, payload) {
      return signInWithEmailAndPassword(getAuth(), payload.email, payload.password)
        .then(({user}) => commit('initializeAuth', {...payload, uid: user.uid}))
        .then(() => fetchDocs(COLLECTION_NAME, {id: getAuth().currentUser.uid}))
        .then(docs => commit('upsert', docs))
        .catch(err => console.error('Something went wrong - User.signIn', err))
    },
    signOut({commit}) {
      return signOut(getAuth())
        .then(() => commit('reset'))
        .catch(err => console.error('Something went wrong - User.signOut', err))
    },
    upsert({commit}, payload) {
      return upsertDoc(COLLECTION_NAME, payload)
        .then(() => commit('upsert', payload))
        .then(() => commit('showSnackbar', 'משתמש נשמר!', {root: true}))
        .catch(err => console.error('Something went wrong - User.upsert', err))
    },
    remove({commit}, id) {
      return removeDoc(COLLECTION_NAME, id)
        .then(() => commit('remove', id))
        .then(() => commit('showSnackbar', 'משתמש נמחק!', {root: true}))
        .catch(err => console.error('Something went wrong - User.remove', err))
    },
    fetch({commit, rootGetters}) {
      const id = rootGetters.user?.isAdmin ? null : rootGetters.user?.userSupplierRef?.id

      return fetchDocs(COLLECTION_NAME, {id})
        .then(docs => commit('initialize', docs))
        .catch(err => console.error('Something went wrong - User.fetch', err))
    },
    fetchCurrent({commit}) {
      const id = getAuth().currentUser?.uid
      if (!id) return console.debug('no user authenticated')

      return fetchDocs(COLLECTION_NAME, {id})
        .then(docs => commit('upsert', docs))
        .catch(err => console.error('Something went wrong - User.fetchCurrent', err))
    },
  },
  modules: {}
}