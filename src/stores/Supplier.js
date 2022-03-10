import {upsertDoc, fetchDocs, removeDoc, docRef} from '@/stores/utils';

const COLLECTION_NAME = 'suppliers'
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
      return upsertDoc(COLLECTION_NAME, payloads, {increment: true})
        .then(doc => commit('upsert', doc))
        .then(() => Promise.all(disconnectUsers.map(user =>
          upsertDoc('users', {...user, userSupplierRef: null})))
          .then(doc => commit('User/upsert', doc, {root: true}))
        )
        .then(() => Promise.all(connectUsers.map(user =>
          upsertDoc('users', {...user, userSupplierRef: docRef(`suppliers/${payload.id}`)})))
          .then(doc => commit('User/upsert', doc, {root: true}))
        )
        .then(() => commit('showSnackbar', 'ספק נשמר!', {root: true}))
        .catch(err => console.error('Something went wrong - Supplier.upsertv', err))
    },
    remove({commit}, id) {
      return removeDoc(COLLECTION_NAME, id)
        .then(() => commit('remove', id))
        .then(() => commit('showSnackbar', 'ספק נמחק!', {root: true}))
        .catch(err => console.error('Something went wrong - Supplier.remove', err))
    },
    fetch({commit, rootGetters}) {
      const {user} = rootGetters

      if (!user?.isAdmin && !user?.userSupplierRef) {
        return console.debug(`Can't fetch Supplier since no supplier connected to this user`)
      }

      const id = user?.isAdmin ? null : user?.userSupplierRef?.id

      return fetchDocs(COLLECTION_NAME, {id})
        .then(docs => commit('initialize', docs))
        .catch(err => console.error('Something went wrong - Supplier.fetch', err))
    }
  },
  modules: {}
}