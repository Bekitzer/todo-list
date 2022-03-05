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
    },
  },
  actions: {
    upsert({commit}, payload) {
      upsertDoc('products-tags', payload)
        .then(docRef => commit('upsert', {...payload, id: docRef.id}))
        .then(() => commit('showSnackbar', 'תגית נשמרה!', {root: true}))
        .catch(err => console.error('Something went wrong - ProductTag.upsert', err))
    },
    remove({commit}, id) {
      return removeDoc('products-tags', id)
        .then(() => commit('remove', id))
        .then(() => commit('showSnackbar', 'תגית נמחקה!', {root: true}))
        .catch(err => console.error('Something went wrong - ProductTag.remove', err))
    },
    fetch({commit, rootGetters}) {
      // TODO extract to App.vue
      if (!rootGetters.user?.isAdmin) return console.debug('not pulling products tags since no admin role')

      return fetchDocs('products-tags')
        .then(querySnapshot => commit('initialize', querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))))
        .catch(err => console.error('Something went wrong - ProductTag.fetch', err))
    }
  },
  modules: {}
}