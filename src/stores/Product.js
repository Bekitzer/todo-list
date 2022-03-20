import { writeDoc, fetchDocs, OPERATIONS } from '@/stores/utils'

const defaults = {
	DEFAULT_COLLECTION: 'products',
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
				.then(() => commit('showSnackbar', 'מוצר עודכן!', { root: true }))
				.catch(err => console.error('Something went wrong - Product.write', err))
		},
		upsert({ commit }, payloads) {
			return writeDoc(payloads, { ...defaults, DEFAULT_OPERATION: OPERATIONS.SET })
				.then(({ [defaults.DEFAULT_COLLECTION]: { set } }) => commit('upsert', set))
				.then(() => commit('showSnackbar', 'מוצר נשמר!', { root: true }))
				.catch(err => console.error('Something went wrong - Product.upsert', err))
		},
		remove({ commit }, payloads) {
			return writeDoc(payloads, { ...defaults, DEFAULT_OPERATION: OPERATIONS.DELETE })
				.then(({ [defaults.DEFAULT_COLLECTION]: { delete: remove } }) => commit('remove', remove))
				.then(() => commit('showSnackbar', 'מוצר נמחק!', { root: true }))
				.catch(err => console.error('Something went wrong - Product.remove', err))
		},
		fetch({ commit }) {
			return fetchDocs(defaults)
				.then(docs => commit('initialize', docs))
				.catch(err => console.error('Something went wrong - Product.fetch', err))
		}
	},
	modules: {}
}
