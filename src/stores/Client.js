import {upsertDoc, fetchDocs, removeDoc} from '@/stores/utils';

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
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
    upsert({commit}, payload) {
      upsertDoc('clients', payload)
        .then(docRef => commit('upsert', {...payload, id: docRef.id}))
        .then(() => commit('showSnackbar', 'לקוח נשמר!', {root: true}))
        .catch(err => console.error('Something went wrong - Client.upsertv', err))
    },
    remove({commit}, id) {
      return removeDoc('clients', id)
        .then(() => commit('remove', id))
        .then(() => commit('showSnackbar', 'לקוח נמחק!', {root: true}))
        .catch(err => console.error('Something went wrong - Client.remove', err))
    },
    fetch({commit, rootGetters}) {
      const id = rootGetters.user?.isAdmin ? null : rootGetters.user?.userClientRef?.id

      return fetchDocs('clients', {id})
        .then(docs => commit('initialize', docs))
        .catch(err => console.error('Something went wrong - Client.fetch', err))
    }
  },
  modules: {}
}