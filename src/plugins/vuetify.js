import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import 'vuetify/dist/vuetify.min.css'
import config from '@/config'

Vue.use(Vuetify, {...config.VUETIFY_USE})

// TODO: igor what is that? do we need it?
// Vue.component('my-component', {
//   methods: {
//     changeLocale () {
//       this.$vuetify.lang.current = 'he'
//     },
//   },
// })

export default new Vuetify({...config.VUETIFY_INSTANCE})