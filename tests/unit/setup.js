import { createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Vue from 'vue'
import VueRouter from 'vue-router'
import config from '@/config'
// import VueMeta from 'vue-meta';
// import * as VueGoogleMaps from 'vue2-google-maps'
// import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'

import numeral from 'numeral'
import { format, parseISO } from 'date-fns'
import { he } from 'date-fns/locale'
import * as VueGoogleMaps from 'vue2-google-maps'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'

Vue.use(Vuetify, { ...config.VUETIFY_USE })

global.localVue = createLocalVue()
global.localVue.use(Vuex)
global.localVue.use(VueRouter)
global.localVue.config.productionTip = false

Vue.config.productionTip = config.productionTip
jest.setTimeout(30_000)

// Vue.use(VueMeta, {
//   refreshOnceOnNavigation: true
// });
//
Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyDKRDIueceXgFm4DCCo6Tt1_fTiG_RQ_Uc',
		libraries: 'places'
	}
})
Vue.use(VuetifyGoogleAutocomplete, {
	version: 'quarterly',
	language: 'he',
	vueGoogleMapsCompatibility: true
})

// TODO: import filters instead of reimplement here
Vue.filter('formatNumber', function(value) {
	return value ? numeral(value).format('0,0') : value
})

Vue.filter('formatDate', function(value) {
	const d = value?.toDate?.() || value
	return d?.toISOString?.() ? format(parseISO(d.toISOString()), config.DATE_FORMAT, { locale: he }) : ''
})

Vue.filter('formatDatetime', function(value) {
	const d = value?.toDate?.() || value
	return d?.toISOString?.() ? format(parseISO(d.toISOString()), `${config.DATE_FORMAT} HH:mm:ss`, { locale: he }) : ''
})

// TODO: refactor
const getComponentMethods = methods => {
	return Object.entries(methods).filter(
		([k, v]) => v && {}.toString.call(v) === '[object Function]' && !k.startsWith('_') && !k.startsWith('$')
	)
}
const getWrapperFunctions = wrapper => {
	return Object.entries(wrapper.vm).filter(
		([k, v]) => v && {}.toString.call(v) === '[object Function]' && !k.startsWith('_') && !k.startsWith('$')
	)
}

export const methodsPromises = wrapper => {
	const promises = []

	;(wrapper.methods ? getComponentMethods(wrapper.methods) : getWrapperFunctions(wrapper)).forEach(([name, method]) => {
		if (wrapper.methods) {
			wrapper.methods[name] = jest.fn(function(...args) {
				const p = method.call(this, ...args)
				promises.push(p)
				return p
			})
		} else {
			wrapper.vm[name] = jest.fn(function(...args) {
				const p = method.call(this, ...args)
				promises.push(p)
				return p
			})
		}
	})

	return promises
}

global.methodsPromises = methodsPromises
