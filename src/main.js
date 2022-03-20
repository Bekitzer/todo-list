import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stores'
import vuetify from './plugins/vuetify'
import VueMeta from 'vue-meta'
import { format, parseISO } from 'date-fns'
import { he } from 'date-fns/locale'
import * as VueGoogleMaps from 'vue2-google-maps'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
import './vee-validate'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import numeral from 'numeral'
import config from '@/config'

Vue.config.productionTip = config.productionTip

Vue.use(VueMeta, {
	refreshOnceOnNavigation: true
})

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

let app = ''
onAuthStateChanged(
	getAuth(),
	user => {
		if (!app) {
			app = new Vue({
				router,
				store,
				vuetify,
				render: h => h(App)
			}).$mount('#app')
		}
	},
	err => {
		console.error('Error while listen to onAuthStateChanged', err)
		throw err
	}
)
