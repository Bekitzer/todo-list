import {writeDoc, fetchDocs, removeDoc, where, OPERATIONS} from '@/stores/utils';

const COLLECTION = 'variations'

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    initialize(state, payloads) {
      state.list = [...payloads]
    },
    remove(state, payloads) {
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
      payloads = payloads.map(payload => ({...payload, COLLECTION}))
      return writeDoc(payloads, {increment: true})
        .then(({variations: {set, delete:remove}}) => {
          commit('upsert', set)
          commit('remove', remove)
        })
        .then(() => commit('showSnackbar', 'וריאציות עודכנו!', {root: true}))
        .catch(err => console.error('Something went wrong - Variation.write', err))
    },
    upsert({commit}, payloads) {
      payloads = payloads.map(payload => ({...payload, COLLECTION, OPERATION: OPERATIONS.SET}))
      return writeDoc(payloads, {increment: true})
        .then(({variations: {set: docs}}) => commit('upsert', docs))
        .then(() => commit('showSnackbar', 'וריאציות נשמרו!', {root: true}))
        .catch(err => console.error('Something went wrong - Variation.upsert', err))
    },
    remove({commit}, payloads) {
      payloads = payloads.map(payload => ({...payload, COLLECTION, OPERATION: OPERATIONS.DELETE}))
      return writeDoc(payloads, {increment: true})
        .then(({variations: {delete: docs}}) => commit('upsert', docs))
        .then(() => commit('showSnackbar', 'וריאציות נמחקו!', {root: true}))
        .catch(err => console.error('Something went wrong - Variation.remove', err))
      // return removeDoc(COLLECTION, id)
      //   .then(() => commit('remove', id))
      //   .then(() => commit('showSnackbar', 'וריאציה נמחקה!', {root: true}))
      //   .catch(err => console.error('Something went wrong - Variation.remove', err))
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

      return fetchDocs(COLLECTION, {filter})
        .then(docs => commit('initialize', docs))
        .catch(err => console.error('Something went wrong - Variation.fetch', err))
    }
  },
  modules: {}
}