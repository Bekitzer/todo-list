import {createDoc, fetchDocs, removeDoc, updateDoc} from '@/stores/utils';

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

        if (!found) items = items.push(payload)
      })

      state.list = items
    }
  },
  actions: {
    create({commit}, payload) {
      createDoc('orders', payload)
        .then(docRef => commit('upsert', {...payload, id: docRef.id}))
        .then(() => commit('showSnackbar', 'הזמנה חדשה נוספה!', {root: true}))
        .catch(err => console.error('Something went wrong - Order.create', err))
    },
    remove({commit}, id) {
      return removeDoc('orders', id)
        .then(() => commit('remove', id))
        .then(() => commit('showSnackbar', 'הזמנה נמחקה!', {root: true}))
        .catch(err => console.error('Something went wrong - Order.remove', err))
    },
    update({commit}, payload) {
      return updateDoc('orders', payload)
        .then(() => commit('upsert', payload))
        .then(() => commit('showSnackbar', 'הזמנה עודכנה!', {root: true}))
        .catch(err => console.error('Something went wrong - Order.update', err))
    },
    fetch({commit, rootGetters}) {
      // TODO extract to App.vue
      if (!rootGetters.user?.isAdmin) return console.debug('not pulling orders since no admin role')

      return fetchDocs('orders')
        .then(querySnapshot => commit('initialize', querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))))
        .catch(err => console.error('Something went wrong - Order.fetch', err))
    },
    getOrder({commit, rootGetters}) {
      if (rootGetters.user?.userOrderRef) {
        rootGetters.user.userOrderRef.get().then(doc => {
          commit('upsert', {...doc.data(), id: doc.id})
        }).catch((error) => {
          console.log('Something went wrong - getOrder', error);
        })
      }
    }
  },
  modules: {}
}