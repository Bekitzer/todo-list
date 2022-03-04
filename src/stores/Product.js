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
      createDoc('products', payload)
        .then(docRef => commit('upsert', {...payload, id: docRef.id}))
        .then(() => commit('showSnackbar', 'מוצר חדש נוסף!', {root: true}))
        .catch(err => console.error('Something went wrong - Product.create', err))
    },
    remove({commit}, id) {
      return removeDoc('products', id)
        .then(() => commit('remove', id))
        .then(() => commit('showSnackbar', 'מוצר נמחק!', {root: true}))
        .catch(err => console.error('Something went wrong - Product.remove', err))
    },
    update({commit}, payload) {
      return updateDoc('products', payload)
        .then(() => commit('upsert', payload))
        .then(() => commit('showSnackbar', 'מוצר עודכן!', {root: true}))
        .catch(err => console.error('Something went wrong - Product.update', err))
    },
    fetch({commit, rootGetters}) {
      // TODO extract to App.vue
      if (!rootGetters.user?.isAdmin) return console.debug('not pulling clients since no admin role')

      return fetchDocs('products')
        .then(querySnapshot => commit('initialize', querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))))
        .catch(err => console.error('Something went wrong - Product.fetch', err))
    },
    getProduct({commit, rootGetters}) {
      if (rootGetters.user?.userProductRef) {
        rootGetters.user.userProductRef.get().then(doc => {
          commit('upsert', {...doc.data(), id: doc.id})
        }).catch((error) => {
          console.log('Something went wrong - getProduct', error);
        })
      }
    },
    // Attributes
    updateAttributes({commit}, payload) {
      updateDoc(doc(db, "products", payload.id), {attributes: payload.attributes})
        .then(() => {
          commit('upsert', payload.attributes)
          commit('showSnackbar', 'מאפיינים עודכנו!', { root: true })
        })
        .catch(error => {
          console.error('Something went wrong - updateAttributes', error);
        })
    }
  },
  modules: {}
}