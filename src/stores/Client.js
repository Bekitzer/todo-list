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
      createDoc('clients', payload)
        .then(docRef => commit('upsert', {...payload, id: docRef.id}))
        .then(() => commit('showSnackbar', 'לקוח חדש נוסף!', {root: true}))
        .catch(err => console.error('Something went wrong - Client.create', err))
    },
    remove({commit}, id) {
      return removeDoc('clients', id)
        .then(() => commit('remove', id))
        .then(() => commit('showSnackbar', 'לקוח נמחק!', {root: true}))
        .catch(err => console.error('Something went wrong - Client.remove', err))
    },
    update({commit}, payload) {
      return updateDoc('clients', payload)
        .then(() => commit('upsert', payload))
        .then(() => commit('showSnackbar', 'לקוח עודכן!', {root: true}))
        .catch(err => console.error('Something went wrong - Client.update', err))
    },
    fetch({commit, rootGetters}) {
      // TODO extract to App.vue
      if (!rootGetters.user?.isAdmin) return console.debug('not pulling clients since no admin role')

      return fetchDocs('clients')
        .then(querySnapshot => commit('initialize', querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))))
        .catch(err => console.error('Something went wrong - Client.fetch', err))
    },
    getClient({commit, rootGetters}) {
      if (rootGetters.user?.userClientRef) {
        rootGetters.user.userClientRef.get().then(doc => {
          commit('upsert', {...doc.data(), id: doc.id})
        }).catch((error) => {
          console.log('Something went wrong - getClient', error);
        })
      }
    },
  },
  modules: {}
}