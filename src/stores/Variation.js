import {writeDoc, fetchDocs, where, OPERATIONS} from '@/stores/utils';

const defaults = {
  DEFAULT_COLLECTION: 'variations',
  DEFAULT_OPERATION: OPERATIONS.SET,
  INCREMENT: true,
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
    upsert(state, payloads = []) {
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
        .then(({[defaults.DEFAULT_COLLECTION]: {delete: remove, set}}) => {
          commit('remove', remove)
          commit('upsert', set)
        })
        .then(() => commit('showSnackbar', 'וריאציות עודכנו!', {root: true}))
        .catch(err => console.error('Something went wrong - Variation.write', err))
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

      return fetchDocs({...defaults, filter})
        .then(docs => commit('initialize', docs))
        .catch(err => console.error('Something went wrong - Variation.fetch', err))
    }
  },
  modules: {}
}