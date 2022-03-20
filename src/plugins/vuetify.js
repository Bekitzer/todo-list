import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import 'vuetify/dist/vuetify.min.css'
import config from '@/config'

Vue.use(Vuetify, { ...config.VUETIFY_USE })

export default new Vuetify({ ...config.VUETIFY_INSTANCE })
