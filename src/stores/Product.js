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
      upsertDoc('products', payload, {increment: true})
        .then(docRef => commit('upsert', {...payload, id: docRef.id}))
        .then(() => commit('showSnackbar', 'מוצר נשמר!', {root: true}))
        .catch(err => console.error('Something went wrong - Product.upsert', err))
    },
    remove({commit}, id) {
      return removeDoc('products', id)
        .then(() => commit('remove', id))
        .then(() => commit('showSnackbar', 'מוצר נמחק!', {root: true}))
        .catch(err => console.error('Something went wrong - Product.remove', err))
    },
    fetch({commit}) {
      return fetchDocs('products')
        .then(docs => commit('initialize', docs))
        .catch(err => console.error('Something went wrong - Product.fetch', err))
    },
    // Attributes
    // updateAttributes({commit}, payload) {
    //   upsertDoc(doc(db, "products", payload.id), {attributes: payload.attributes})
    //     .then(() => {
    //       commit('upsert', payload.attributes)
    //       commit('showSnackbar', 'מאפיינים נשמרו!', { root: true })
    //     })
    //     .catch(error => {
    //       console.error('Something went wrong - updateAttributes', error);
    //     })
    // }
  },
  modules: {}
}