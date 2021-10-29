import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMeta from 'vue-meta'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

Vue.config.productionTip = false
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})
var numeral = require("numeral");
Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,0")
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