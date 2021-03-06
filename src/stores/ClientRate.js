import { writeDoc, fetchDocs, OPERATIONS } from '@/stores/utils'

const defaults = {
	DEFAULT_COLLECTION: 'client-rates',
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
				.then(() => commit('showSnackbar', 'תעריפי לקוח עודכנו!', { root: true }))
				.catch(err => console.error('Something went wrong - ClientRate.write', err))
		},
		upsert({ commit }, payloads) {
			return writeDoc(payloads, { ...defaults, DEFAULT_OPERATION: OPERATIONS.SET })
				.then(({ [defaults.DEFAULT_COLLECTION]: { set } }) => commit('upsert', set))
				.then(() => commit('showSnackbar', 'תעריפי לקוח נשמרו!', { root: true }))
				.catch(err => console.error('Something went wrong - ClientRate.upsert', err))
		},
		remove({ commit }, payloads) {
			return writeDoc(payloads, { ...defaults, DEFAULT_OPERATION: OPERATIONS.DELETE })
				.then(({ [defaults.DEFAULT_COLLECTION]: { delete: remove } }) => commit('remove', remove))
				.then(() => commit('showSnackbar', 'תעריפי לקוח נמחקו!', { root: true }))
				.catch(err => console.error('Something went wrong - ClientRate.remove', err))
		},
		fetch({ commit, rootGetters }) {
			if (!rootGetters.user?.isAdmin) return Promise.resolve(null)

			return fetchDocs(defaults)
				.then(docs => commit('initialize', docs))
				.catch(err => console.error('Something went wrong - ClientRate.fetch', err))
		}
	},
	modules: {}
}
