import {
	getDoc,
	getDocs,
	collection,
	doc,
	query,
	where,
	runTransaction,
	serverTimestamp,
	writeBatch,
	Timestamp
} from 'firebase/firestore'
import { db } from '@/firebase'
import { he } from 'date-fns/locale'
import { parse } from 'date-fns'

export const docRef = (path) => doc(db, path)

export { where }

export const OPERATIONS = {
	SET: 'set',
	UPDATE: 'update',
	DELETE: 'delete'
}

function dbMigration() {
	const ifYouKnowWhatYouAreDoing = true
	if (!ifYouKnowWhatYouAreDoing) throw 'Stop right now you stupid f***'

	const collectionName = 'variations'

	const isDate = (d) => d instanceof Date && !isNaN(d)
	const isString = (str) => typeof str === 'string' || str instanceof String
	const strToDatetime = (str, sep = '') => parse(str, `EEEEE${sep} dd/MM/yy HH:mm`, new Date(), { locale: he })
	const strToDate = (str, sep = '') => parse(str, `EEEEE${sep} dd/MM/yy`, new Date(), { locale: he })

	const batch = writeBatch(db)

	return getDocs(collection(db, collectionName))
		.then((snapshot) => {
			const items = []

			snapshot.docs.forEach((item) => {
				// if (item.id !== "B975TlaDgsfW7Visy53YHfUnXMC2") return

				let { deliveredAt, createdAt, updatedAt, ...rest } = item.data()

				// createdAt = 'ש׳ 16/10/2021'
				// createdAt = 'ה׳ 06/01/22 13:16'
				// createdAt = 'א׳, 13/03/22 22:04'
				// createdAt = 'א׳, 13/03/22'
				// createdAt = Timestamp.now().toJSON()
				// createdAt = Timestamp.now()
				// createdAt = null
				if (deliveredAt) {
					if (deliveredAt.toDate) {
						rest.deliveredAt = deliveredAt
					} else if (deliveredAt.seconds) {
						rest.deliveredAt = toTimestamp(deliveredAt)
					} else if (isString(deliveredAt) && isDate(strToDatetime(deliveredAt))) {
						rest.deliveredAt = Timestamp.fromDate(strToDatetime(deliveredAt))
					} else if (isString(deliveredAt) && isDate(strToDate(deliveredAt))) {
						rest.deliveredAt = Timestamp.fromDate(strToDate(deliveredAt))
					} else if (isString(deliveredAt) && isDate(strToDatetime(deliveredAt, ','))) {
						rest.deliveredAt = Timestamp.fromDate(strToDatetime(deliveredAt, ','))
					} else if (isString(deliveredAt) && isDate(strToDate(deliveredAt, ','))) {
						rest.deliveredAt = Timestamp.fromDate(strToDate(deliveredAt, ','))
					} else {
						console.error('deliveredAt', rest)
						debugger
					}
				}

				if (createdAt) {
					if (createdAt.toDate) {
						rest.createdAt = createdAt
					} else if (createdAt.seconds) {
						rest.createdAt = toTimestamp(createdAt)
					} else if (isString(createdAt) && isDate(strToDatetime(createdAt))) {
						rest.createdAt = Timestamp.fromDate(strToDatetime(createdAt))
					} else if (isString(createdAt) && isDate(strToDate(createdAt))) {
						rest.createdAt = Timestamp.fromDate(strToDate(createdAt))
					} else if (isString(createdAt) && isDate(strToDatetime(createdAt, ','))) {
						rest.createdAt = Timestamp.fromDate(strToDatetime(createdAt, ','))
					} else if (isString(createdAt) && isDate(strToDate(createdAt, ','))) {
						rest.createdAt = Timestamp.fromDate(strToDate(createdAt, ','))
					} else {
						console.error('createdAt', rest)
						debugger
					}
				}

				if (updatedAt) {
					if (updatedAt.toDate) {
						rest.updatedAt = updatedAt
					} else if (updatedAt.seconds) {
						rest.updatedAt = toTimestamp(updatedAt)
					} else if (isString(updatedAt) && isDate(strToDatetime(updatedAt))) {
						rest.updatedAt = Timestamp.fromDate(strToDatetime(updatedAt))
					} else if (isString(updatedAt) && isDate(strToDate(updatedAt))) {
						rest.updatedAt = Timestamp.fromDate(strToDate(updatedAt))
					} else if (isString(updatedAt) && isDate(strToDatetime(updatedAt, ','))) {
						rest.updatedAt = Timestamp.fromDate(strToDatetime(updatedAt, ','))
					} else if (isString(updatedAt) && isDate(strToDate(updatedAt, ','))) {
						rest.updatedAt = Timestamp.fromDate(strToDate(updatedAt, ','))
					} else {
						console.error('updatedAt', rest)
						debugger
					}
				} else {
					rest.updatedAt = rest.createdAt ? toTimestamp(rest.createdAt) : Timestamp.now()
				}

				if (!rest.createdAt) {
					rest.createdAt = rest.updatedAt ? toTimestamp(rest.updatedAt) : Timestamp.now()
					console.error('no createdAt', rest)
					debugger
				}

				items.push(rest)
				batch.set(docRef(`${collectionName}/${item.id}`), rest)
			})

			return items
		})
		.then((items) => {
			console.log('batch commit', items)
			batch.commit().catch((err) => console.error(collectionName, err))
		})
}

// dbMigration()

const groupByKey = (list, key) => {
	return list.reduce((hash, obj) => ({ ...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj) }), {})
}

const generateTimestamps = (payload, currentTimes) => {
	const localTimestamps = {}
	const serverTimestamps = {}

	localTimestamps.createdAt = payload.id ? toTimestamp(payload.createdAt) : currentTimes.local
	serverTimestamps.createdAt = payload.id ? toTimestamp(payload.createdAt) : currentTimes.server

	localTimestamps.updatedAt = currentTimes.local
	serverTimestamps.updatedAt = currentTimes.server

	return { localTimestamps, serverTimestamps }
}

const batchIncrement = (name, items) => {
	const incrementDocRef = docRef(`--stats--/${name}`)

	return runTransaction(db, async (transaction) => {
		const incrementDoc = await transaction.get(incrementDocRef)

		if (!incrementDoc.exists()) throw 'Document does not exist!'

		const oldNumber = incrementDoc.data().increment

		// security do not allow multiple inserts
		const newNumber = oldNumber + items.length

		await transaction.update(incrementDocRef, { increment: newNumber })

		return { oldNumber, newNumber }
	})
}

export const toTimestamp = ({ seconds, nanoseconds }) => {
	return new Timestamp(seconds, nanoseconds)
}

export const deepCopy = (data) => {
	if (data === null || typeof data !== 'object' || 'isActiveClone' in data) return data

	let temp

	if (data instanceof Date) return new Date(data)
	else if (data instanceof Timestamp) return toTimestamp(data)
	else if (data.firestore && data.path && data.type === 'document') return docRef(data.path)
	else if (data.firestore && data.path && data.type === 'collection') return collection(db, data.path)
	else temp = Array.isArray(data) ? [] : {}

	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			data['isActiveClone'] = null
			temp[key] = deepCopy(data[key])
			delete data['isActiveClone']
		}
	}
	return temp
}

export const fetchDocs = (options = {}) => {
	const { DEFAULT_COLLECTION, id = null, filter = null } = options

	if (id) {
		return getDoc(docRef(`${DEFAULT_COLLECTION}/${id}`)).then((doc) => [{ ...doc.data(), id: doc.id }])
	}

	if (filter) {
		return getDocs(query(collection(db, DEFAULT_COLLECTION), filter)).then((snapshot) =>
			snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
		)
	}

	return getDocs(collection(db, DEFAULT_COLLECTION)).then((snapshot) =>
		snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
	)
}

export const writeDoc = async (payloads, options = {}) => {
	if (!Array.isArray(payloads)) payloads = [payloads]

	const { DEFAULT_COLLECTION, DEFAULT_OPERATION, INCREMENT, TIMESTAMPS = true } = options

	payloads = payloads.map((payload) => ({
		...payload,
		COLLECTION: payload.COLLECTION || DEFAULT_COLLECTION,
		OPERATION: payload.OPERATION || DEFAULT_OPERATION
	}))

	const times = {
		local: Timestamp.now(),
		server: serverTimestamp()
	}

	const collections = groupByKey(payloads, 'COLLECTION') // e.g. {users: [...]}

	Object.keys(collections).forEach((name) => {
		collections[name] = groupByKey(collections[name], 'OPERATION') // e.g. {users: {delete: [...]}}
	})

	await Promise.all(
		Object.keys(collections).map((name) => {
			if (!collections[name][OPERATIONS.SET]?.length || !INCREMENT) return Promise.resolve()

			const newDocs = collections[name][OPERATIONS.SET].filter(({ id }) => !id)

			return batchIncrement(name, newDocs).then(({ oldNumber }) =>
				collections[name][OPERATIONS.SET].forEach((payload, i) => {
					if (!payload.id) payload.number = oldNumber + i + 1
				})
			)
		})
	)

	const batch = writeBatch(db)

	Object.keys(collections).forEach((name) =>
		Object.keys(collections[name]).forEach((operation) => {
			collections[name][operation] = collections[name][operation].map((payload) => {
				const { localTimestamps, serverTimestamps } = TIMESTAMPS ? generateTimestamps(payload, times) : {}

				const { COLLECTION, OPERATION, id, key, ...fields } = payload

				const newDocRef = id || key ? docRef(`${COLLECTION}/${id || key}`) : doc(collection(db, COLLECTION))

				batch[OPERATION](newDocRef, { ...fields, ...serverTimestamps })

				return { ...fields, ...localTimestamps, id: newDocRef.id }
			})
		})
	)

	await batch.commit()

	return collections
}
