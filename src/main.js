import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stores'
import vuetify from './plugins/vuetify'
import VueMeta from 'vue-meta'
import {format, parseISO} from 'date-fns'
import {he} from 'date-fns/locale'
import * as VueGoogleMaps from 'vue2-google-maps'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
import './vee-validate'
import {onAuthStateChanged, getAuth} from 'firebase/auth'
import numeral from 'numeral'
import config from '@/config'

Vue.config.productionTip = config.productionTip

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBPTgcGTdaYE3FEEL-j61IEB_76BI84_90',
    // This is required to use the Autocomplete plugin
    libraries: 'places', // 'places,drawing,visualization'
  },
})
Vue.use(VuetifyGoogleAutocomplete, {
  // apiKey: 'AIzaSyBPTgcGTdaYE3FEEL-j61IEB_76BI84_90', // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
  version: 'quarterly', // Optional
  language: 'he', // Optional
  installComponents: true, // Optional (default: true) - false, if you want to locally install components
  vueGoogleMapsCompatibility: true, // Optional (default: false) - true, requires vue2-google-maps to be configured see https://github.com/xkjyeah/vue-google-maps
})


Vue.filter("formatNumber", function (value) {
  return value ? numeral(value).format("0,0") : value
})

Vue.filter("formatDate", function (value) {
  return value?.toDate?.() ? format(parseISO(value.toDate().toISOString()), config.DATE_FORMAT, {locale: he}) : ''
})

Vue.filter("formatDatetime", function (value) {
  return value?.toDate?.() ? format(parseISO(value.toDate().toISOString()), `${config.DATE_FORMAT} HH:mm`, {locale: he}) : ''
})

let app = '';
onAuthStateChanged(getAuth(), user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount('#app')
  }
}, err => {
  console.error('Error while listen to onAuthStateChanged', err)
  throw err
})