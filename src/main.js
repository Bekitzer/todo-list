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
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
import * as comps from "vuetify/es5/components"

Vue.config.productionTip = false
Vue.use(
  VueMeta, {
    refreshOnceOnNavigation: true
  },
)
Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyBPTgcGTdaYE3FEEL-j61IEB_76BI84_90', // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
  version: 'quarterly', // Optional
  language: 'he', // Optional
  installComponents: true, // Optional (default: true) - false, if you want to locally install components
  vueGoogleMapsCompatibility: false, // Optional (default: false) - true, requires vue2-google-maps to be configured see https://github.com/xkjyeah/vue-google-maps
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

const override = comps.VTextField.extend({
  onInput(e) {
    const target = e.target
    if (this.type !== "number") this.internalValue = target.value
    else {
      this.internalValue = target.valueAsNumber
    }
    this.badInput = target.validity && target.validity.badInput
  }
})
Vue.component('NewVTextField', override)