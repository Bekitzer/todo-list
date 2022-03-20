import { writeDoc, fetchDocs, OPERATIONS } from '@/stores/utils'

const defaults = {
	DEFAULT_COLLECTION: 'clients',
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
				.then(() => commit('showSnackbar', 'לקוח עודכן!', { root: true }))
				.catch((err) => console.error('Something went wrong - Client.write', err))
		},
		upsert({ commit }, payloads) {
			return writeDoc(payloads, { ...defaults, DEFAULT_OPERATION: OPERATIONS.SET })
				.then(({ [defaults.DEFAULT_COLLECTION]: { set }, users: { set: setUsers } = {} }) => {
					commit('upsert', set)
					commit('User/upsert', setUsers, { root: true })
				})
				.then(() => commit('showSnackbar', 'לקוח נשמר!', { root: true }))
				.catch((err) => console.error('Something went wrong - Client.upsert', err))
		},
		remove({ commit }, payloads) {
			return writeDoc(payloads, { ...defaults, DEFAULT_OPERATION: OPERATIONS.DELETE })
				.then(({ [defaults.DEFAULT_COLLECTION]: { delete: remove } }) => commit('remove', remove))
				.then(() => commit('showSnackbar', 'לקוח נמחק!', { root: true }))
				.catch((err) => console.error('Something went wrong - Client.remove', err))
		},
		fetch({ commit, rootGetters }) {
			const { user } = rootGetters

			if (!user?.isAdmin && !user?.userClientRef) {
				return console.debug(`Can't fetch Client since no client connected to this user`)
			}

			const id = user?.isAdmin ? null : user?.userClientRef?.id

			return fetchDocs({ ...defaults, id })
				.then((docs) => commit('initialize', docs))
				.catch((err) => console.error('Something went wrong - Client.fetch', err))
		}
	},
	modules: {}
}
