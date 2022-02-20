import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMeta from 'vue-meta'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { format, parse } from 'date-fns'
import { he } from 'date-fns/locale'
import * as VueGoogleMaps from 'vue2-google-maps';
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'

Vue.config.productionTip = false
Vue.use(VueMeta, {
    refreshOnceOnNavigation: true
  },
)
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



var numeral = require("numeral");
Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,0")
})

Vue.filter("formatDate", function (value) {
  if (value && value.seconds) {
    return format(new Date(value.seconds * 1000), 'EEEEE, dd/MM/yy', {locale: he})
  }
})

Vue.filter("formatDateReverse", function (value) {
  if (value) {
    return parse(value, 'EEEEE, dd/MM/yy', new Date(), {locale: he})
  }
})

let app = '';
firebase.auth().onAuthStateChanged(user => {
  if(!app){
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount('#app')
  }
})