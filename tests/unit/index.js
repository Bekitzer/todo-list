process.env = Object.assign(process.env, { NODE_ENV: 'testing' })
import { createLocalVue } from '@vue/test-utils'

import Vuetify from "vuetify";
import Vuex from 'vuex';
import Vue from 'vue'

Vue.use(Vuetify)

global.localVue = createLocalVue()
global.localVue.use(Vuex)
global.localVue.config.productionTip = false;

// global.setImmediate = jest.useRealTimers;