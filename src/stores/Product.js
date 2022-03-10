import {upsertDoc, fetchDocs, removeDoc, where} from '@/stores/utils';
const COLLECTION_NAME = 'products'

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
        .then(() => commit('showSnackbar', 'מוצר נשמר!', {root: true}))
        .catch(err => console.error('Something went wrong - Product.upsert', err))
    },
    remove({commit}, id) {
      return removeDoc(COLLECTION_NAME, id)
        .then(() => commit('remove', id))
        .then(() => commit('showSnackbar', 'מוצר נמחק!', {root: true}))
        .catch(err => console.error('Something went wrong - Product.remove', err))
    },
    fetch({commit}) {
      return fetchDocs(COLLECTION_NAME)
        .then(docs => commit('initialize', docs))
        .catch(err => console.error('Something went wrong - Product.fetch', err))
    }
  },
  modules: {}
}