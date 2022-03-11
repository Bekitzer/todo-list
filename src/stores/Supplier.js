import {writeDoc, fetchDocs, removeDoc, docRef, OPERATIONS} from '@/stores/utils';

const defaults = {
  DEFAULT_COLLECTION: 'suppliers',
  DEFAULT_OPERATION: OPERATIONS.SET,
  INCREMENT: true
}

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    initialize(state, payloads) {
      state.list = [...payloads]
    },
    remove(state, payloads = []) {
      state.list = state.list.filter(item => !payloads.find(({id}) => id === item.id))
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
    write({commit}, payloads) {
      return writeDoc(payloads, defaults)
        .then(({[defaults.DEFAULT_OPERATION]: {set, delete: remove}}) => {
          commit('upsert', set)
          commit('remove', remove)
        })
        .then(() => commit('showSnackbar', 'ספק עודכן!', {root: true}))
        .catch(err => console.error('Something went wrong - Supplier.write', err))
    },
    upsert({commit}, payloads) {
      return writeDoc(payloads, {...defaults, DEFAULT_OPERATION: OPERATIONS.SET})
        .then(({[defaults.DEFAULT_OPERATION]: {set}}) => commit('upsert', set))
        .then(() => commit('showSnackbar', 'ספק נשמר!', {root: true}))
        .catch(err => console.error('Something went wrong - Supplier.upsert', err))
    },
    remove({commit}, payloads) {
      return writeDoc(payloads, {...defaults, DEFAULT_OPERATION: OPERATIONS.DELETE})
        .then(({[defaults.DEFAULT_OPERATION]: {delete: remove}}) => commit('remove', remove))
        .then(() => commit('showSnackbar', 'ספק נמחק!', {root: true}))
        .catch(err => console.error('Something went wrong - Supplier.remove', err))
    },
    // upsert({commit}, {connectUsers = [], disconnectUsers = [], ...payloads}) {
    //   return writeDoc(COLLECTION, payloads, {INCREMENT: true})
    //     .then(doc => commit('upsert', doc))
    //     .then(() => Promise.all(disconnectUsers.map(user =>
    //       writeDoc('users', {...user, userSupplierRef: null})))
    //       .then(doc => commit('User/upsert', doc, {root: true}))
    //     )
    //     .then(() => Promise.all(connectUsers.map(user =>
    //       writeDoc('users', {...user, userSupplierRef: docRef(`suppliers/${payload.id}`)})))
    //       .then(doc => commit('User/upsert', doc, {root: true}))
    //     )
    //     .then(() => commit('showSnackbar', 'ספק נשמר!', {root: true}))
    //     .catch(err => console.error('Something went wrong - Supplier.upsertv', err))
    // },
    // remove({commit}, id) {
    //   return removeDoc(COLLECTION, id)
    //     .then(() => commit('remove', id))
    //     .then(() => commit('showSnackbar', 'ספק נמחק!', {root: true}))
    //     .catch(err => console.error('Something went wrong - Supplier.remove', err))
    // },
    fetch({commit, rootGetters}) {
      const {user} = rootGetters

      if (!user?.isAdmin && !user?.userSupplierRef) {
        return console.debug(`Can't fetch Supplier since no supplier connected to this user`)
      }

      const id = user?.isAdmin ? null : user?.userSupplierRef?.id

      return fetchDocs({...defaults, id})
        .then(docs => commit('initialize', docs))
        .catch(err => console.error('Something went wrong - Supplier.fetch', err))
    }
  },
  modules: {}
}