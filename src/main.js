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


Vue.config.productionTip = false
Vue.use(
  VueMeta, {
    refreshOnceOnNavigation: true
  }
)



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
});