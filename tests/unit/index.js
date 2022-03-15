import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from 'vuex';
Vue.config.productionTip = false;

Vue.use(Vuex)
Vue.use(Vuetify);

Vue.prototype.$store = new Vuex.Store()
