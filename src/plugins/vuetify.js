import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import 'vuetify/dist/vuetify.min.css'
import he from 'vuetify/lib/locale/he'

Vue.use(Vuetify, {
  iconfont: 'jp',
  icons: {
    'order': 'jp-order',
    'client': 'jp-client'
  }
})

Vue.component('my-component', {
  methods: {
    changeLocale () {
      this.$vuetify.lang.current = 'he'
    },
  },
})

export default new Vuetify({
  rtl: true,
  lang: {
    locales: { he },
    current: 'he',
  },
});