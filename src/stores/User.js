import {upsertDoc, fetchDocs, removeDoc} from '@/stores/utils';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  updateProfile
} from 'firebase/auth'

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
      state.auth = {...payloads}
    },
    initialize(state, payloads) {
      state.list = [...payloads]
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
          if (item.id === payload.id) {
            found = true
            return payload
          }

          return item
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
        .then(() => updateProfile(getAuth().currentUser, {displayName: payload.username}))
        .then(() => upsertDoc(COLLECTION_NAME, {...payload, id: getAuth().currentUser.uid}, {increment: true}))
        .then(() => commit('upsert', {...payload, id: getAuth().currentUser.uid}))
        .then(() => commit('showSnackbar', 'הרשמה בוצעה בהצלחה!', {root: true}))
        .catch(err => console.error('Something went wrong - User.signUp', err))
    },
    signIn({commit}, payload) {
      return signInWithEmailAndPassword(getAuth(), payload.email, payload.password)
        .then(({user}) => commit('initializeAuth', {...payload, uid: user.uid}))
        .then(() => fetchDocs(COLLECTION_NAME, {id: getAuth().currentUser.uid}))
        .then(docs => commit('upsert', docs))
        .then(() => commit('showSnackbar', 'התחברות בוצעה בהצלחה!', {root: true}))
        .catch(err => console.error('Something went wrong - User.signIn', err))
    },
    signOut({commit}) {
      return signOut(getAuth())
        .then(() => commit('reset'))
        .catch(err => console.error('Something went wrong - User.signOut', err))
    },
    upsert({commit}, payloads) {
      return upsertDoc(COLLECTION_NAME, payloads, {increment: true})
        .then(doc => commit('upsert', doc))
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
      if (!rootGetters.user?.isAdmin) return Promise.resolve(null)

      return fetchDocs(COLLECTION_NAME)
        .then(docs => commit('initialize', docs))
        .catch(err => console.error('Something went wrong - User.fetch', err))
    },
    fetchCurrent({commit}) {
      const {currentUser} = getAuth()
      if (!currentUser) return Promise.reject('UNAUTHENTICATED')

      return fetchDocs(COLLECTION_NAME, {id: currentUser.uid})
        .then(docs => commit('upsert', docs))
        .then(() => commit('initializeAuth', currentUser))
        .catch(err => console.error('Something went wrong - User.fetchCurrent', err))
    },
  },
  modules: {}
}