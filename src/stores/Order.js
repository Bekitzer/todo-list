import { writeDoc, fetchDocs, where, OPERATIONS } from '@/stores/utils'

const defaults = {
	DEFAULT_COLLECTION: 'orders',
	DEFAULT_OPERATION: OPERATIONS.SET,
	INCREMENT: true
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
			state.list = state.list.filter(item => !payloads.find(({ id }) => id === item.id))
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
		write({ commit }, payloads) {
			return writeDoc(payloads, defaults)
				.then(({ [defaults.DEFAULT_COLLECTION]: { delete: remove, set } }) => {
					commit('remove', remove)
					commit('upsert', set)
				})
				.then(() => commit('showSnackbar', 'הזמנה עודכנה!', { root: true }))
				.catch(err => console.error('Something went wrong - Order.write', err))
		},
		upsert({ commit }, payloads) {
			return writeDoc(payloads, { ...defaults, DEFAULT_OPERATION: OPERATIONS.SET })
				.then(({ [defaults.DEFAULT_COLLECTION]: { set } }) => commit('upsert', set))
				.then(() => commit('showSnackbar', 'הזמנה נשמרה!', { root: true }))
				.catch(err => console.error('Something went wrong - Order.upsert', err))
		},
		remove({ commit }, payloads) {
			return writeDoc(payloads, { ...defaults, DEFAULT_OPERATION: OPERATIONS.DELETE })
				.then(({ [defaults.DEFAULT_COLLECTION]: { delete: remove } }) => commit('remove', remove))
				.then(() => commit('showSnackbar', 'הזמנה נמחקה!', { root: true }))
				.catch(err => console.error('Something went wrong - Order.remove', err))
		},
		fetch({ commit, rootGetters }) {
			const { user } = rootGetters

			let filter = null

			if (!user?.isAdmin) {
				if (!user?.userSupplierRef && !user?.userClientRef) {
					return console.debug(`Can't fetch Orders since no supplier nor client connected to this user`)
				}

				filter = user?.userSupplierRef
					? where('orderSupplierRef', '==', user?.userSupplierRef)
					: where('orderClientRef', '==', user?.userClientRef)
			}

			return fetchDocs({ ...defaults, filter })
				.then(docs => commit('initialize', docs))
				.catch(err => console.error('Something went wrong - Order.fetch', err))
		}
	},
	modules: {}
}
