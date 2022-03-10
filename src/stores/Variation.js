import {upsertDoc, fetchDocs, removeDoc, where} from '@/stores/utils';
const COLLECTION_NAME = 'variations'

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
    upsert({commit}, payloads) {
      return upsertDoc(COLLECTION_NAME, payloads, {increment: true})
        .then(doc => commit('upsert', doc))
        .then(() => commit('showSnackbar', 'וריאציה נשמרה!', {root: true}))
        .catch(err => console.error('Something went wrong - Variation.upsert', err))
    },
    remove({commit}, id) {
      return removeDoc(COLLECTION_NAME, id)
        .then(() => commit('remove', id))
        .then(() => commit('showSnackbar', 'וריאציה נמחקה!', {root: true}))
        .catch(err => console.error('Something went wrong - Variation.remove', err))
    },
    fetch({commit, rootGetters}) {
      const {user} = rootGetters

      let filter = null

      if (!user?.isAdmin) {
        if (!user?.userSupplierRef) {
          return console.debug(`Can't fetch Variations since no supplier connected to this user`)
        }

        filter = where('variationSupplierRef', '==', user?.userSupplierRef?.id)
      }

      return fetchDocs(COLLECTION_NAME, {filter})
        .then(docs => commit('initialize', docs))
        .catch(err => console.error('Something went wrong - Variation.fetch', err))
    }
  },
  modules: {}
}