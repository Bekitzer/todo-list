import {upsertDoc, fetchDocs, removeDoc, where} from '@/stores/utils';

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
    upsert({commit}, payload) {
      return upsertDoc('orders', payload, {increment: true})
        .then(doc => commit('upsert', doc))
        .then(() => commit('showSnackbar', 'הזמנה נשמרה!', {root: true}))
        .catch(err => console.error('Something went wrong - Order.upsert', err))
    },
    remove({commit}, id) {
      return removeDoc('orders', id)
        .then(() => commit('remove', id))
        .then(() => commit('showSnackbar', 'הזמנה נמחקה!', {root: true}))
        .catch(err => console.error('Something went wrong - Order.remove', err))
    },
    fetch({commit, rootGetters}) {
      const {user} = rootGetters
      if(!user?.userSupplierRef) return console.debug('Can\'t fetch Orders since no supplier connected to this user')

      const filter = user?.isAdmin ? null : where('orderSupplierRef', '==', user?.userSupplierRef)

      return fetchDocs('orders', {filter})
        .then(docs => commit('initialize', docs))
        .catch(err => console.error('Something went wrong - Order.fetch', err))
    }
  },
  modules: {}
}