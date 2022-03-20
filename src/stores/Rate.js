import { writeDoc, fetchDocs, where, OPERATIONS } from '@/stores/utils'

const defaults = {
	DEFAULT_COLLECTION: 'rates',
	DEFAULT_OPERATION: OPERATIONS.SET
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
			state.list = state.list.filter((item) => !payloads.find(({ id }) => id === item.id))
		},
		upsert(state, payloads = []) {
			if (!Array.isArray(payloads)) payloads = [payloads]

			let items = [...state.list]

			payloads.forEach((payload) => {
				let found = false

				items = items.map((item) => {
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
				.then(() => commit('showSnackbar', 'תעריפים עודכנו!', { root: true }))
				.catch((err) => console.error('Something went wrong - Rate.write', err))
		},
		upsert({ commit }, payloads) {
			return writeDoc(payloads, { ...defaults, DEFAULT_OPERATION: OPERATIONS.SET })
				.then(({ [defaults.DEFAULT_COLLECTION]: { set } }) => commit('upsert', set))
				.then(() => commit('showSnackbar', 'תעריפים נשמרו!', { root: true }))
				.catch((err) => console.error('Something went wrong - Rate.upsert', err))
		},
		remove({ commit }, payloads) {
			return writeDoc(payloads, { ...defaults, DEFAULT_OPERATION: OPERATIONS.DELETE })
				.then(({ [defaults.DEFAULT_COLLECTION]: { delete: remove } }) => commit('remove', remove))
				.then(() => commit('showSnackbar', 'תעריפים נמחקו!', { root: true }))
				.catch((err) => console.error('Something went wrong - Rate.remove', err))
		},
		fetch({ commit, rootGetters }) {
			const { user } = rootGetters

			let filter = null

			if (!user?.isAdmin) {
				if (!user?.userSupplierRef) {
					return console.debug(`Can't fetch Rate since no supplier connected to this user`)
				}

				filter = where('rateSupplierRef', '==', user?.userSupplierRef?.id)
			}

			return fetchDocs({ ...defaults, filter })
				.then((docs) => commit('initialize', docs))
				.catch((err) => console.error('Something went wrong - Rate.fetch', err))
		}
	},
	modules: {}
}
