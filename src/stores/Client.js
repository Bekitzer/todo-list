import {upsertDoc, fetchDocs, removeDoc} from '@/stores/utils';

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
    upsert({commit}, {addUsers = [], removeUsers = [], ...payload}) {
      console.log(addUsers, removeUsers, payload)

      // updateDoc(doc(db, "suppliers", supplier.id), supplier)
      //   .then(() => Promise.all(removeUsersIds.map(userId => {
      //     return updateDoc(doc(db, "users", userId), {supplierRef: null})
      //   })))
      //   .then(() => Promise.all(usersIds.map(userId => {
      //     return updateDoc(doc(db, "users", userId), {supplierRef: supplier.id})
      //   })))
      //   .then(() => {
      //     commit('updateSupplier', supplier)
      //     removeUsersIds.map(id => commit('updateUser', {id, supplierRef: null}))
      //     usersIds.map(id => commit('updateUser', {id, supplierRef: supplier.id}))
      //     commit('showSnackbar', 'ספק עודכן!')
      //   })

      return upsertDoc('clients', payload, {increment: true})
        .then(() => Promise.all(removeUsers.map(user =>
          upsertDoc('users', {...user, userClientRef: null}))))
        .then(() => Promise.all(addUsers.map(user =>
          upsertDoc('users', {...user, userClientRef: payload.id}))))
        .then(() => upsertDoc('clients', payload, {increment: true}))
        .then(doc => commit('upsert', doc))
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
      const {user} = rootGetters

      if (!user?.isAdmin && !user?.userClientRef) {
        return console.debug(`Can't fetch Client since no client connected to this user`)
      }

      const id = user?.isAdmin ? null : user?.userClientRef?.id

      return fetchDocs('clients', {id})
        .then(docs => commit('initialize', docs))
        .catch(err => console.error('Something went wrong - Client.fetch', err))
    }
  },
  modules: {}
}