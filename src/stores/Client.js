import {writeDoc, fetchDocs, removeDoc, docRef} from '@/stores/utils';
const COLLECTION = 'clients'

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
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
    upsert({commit}, {connectUsers = [], disconnectUsers = [], ...payloads}) {
      return writeDoc(COLLECTION, payloads, {increment: true})
        .then(doc => commit('upsert', doc))
        .then(() => Promise.all(disconnectUsers.map(user =>
          writeDoc('users', {...user, userClientRef: null})))
          .then(doc => commit('User/upsert', doc, {root: true}))
        )
        .then(() => Promise.all(connectUsers.map(user =>
          writeDoc('users', {...user, userClientRef: docRef(`clients/${payload.id}`)})))
          .then(doc => commit('User/upsert', doc, {root: true}))
        )
        .then(() => commit('showSnackbar', 'לקוח נשמר!', {root: true}))
        .catch(err => console.error('Something went wrong - Client.upsertv', err))
    },
    remove({commit}, id) {
      return removeDoc(COLLECTION, id)
        .then(() => commit('remove', id))
        .then(() => commit('showSnackbar', 'לקוח נמחק!', {root: true}))
        .catch(err => console.error('Something went wrong - Client.remove', err))
    },
    fetch({commit, rootGetters}) {
      const {user} = rootGetters

      if (!user?.isAdmin && !user?.userClientRef) {
        return console.debug(`Can't fetch Client since no client connected to this user`)
      }

      const id = user?.isAdmin ? null : user?.userClientRef?.id

      return fetchDocs(COLLECTION, {id})
        .then(docs => commit('initialize', docs))
        .catch(err => console.error('Something went wrong - Client.fetch', err))
    }
  },
  modules: {}
}