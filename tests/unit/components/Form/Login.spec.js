import { mount } from '@vue/test-utils'
import routes from '@/router/routes'
import Login from '@/components/Form/Login'
import Dashboard from '@/components/Profile/Dashboard'
import App from '@/App.vue'

import Vuex from 'vuex'
import Vuetify from 'vuetify'

import VueRouter from 'vue-router'
import { options } from '@/stores'
import { cloneDeep } from 'lodash'
import config from '@/config'

const localVue = global.localVue

describe('Login.vue', () => {
	let store
	let vuetify
	let router
	let promises

	beforeEach(() => {
		vuetify = new Vuetify({ ...config.VUETIFY_INSTANCE })
		store = new Vuex.Store(cloneDeep(options))
		router = new VueRouter({ ...config.ROUTER_OPTIONS, routes })
	})

	const mountFunction = (options) => {
		promises = global.methodsPromises(App)
		return mount(App, { store, localVue, vuetify, router, ...options })
	}

	it('retrieve user information when successful login', async () => {
		const wrapper = mountFunction()
		await Promise.all(promises)

		const login = wrapper.findComponent(Login)
		const loginPromises = global.methodsPromises(login)

		expect(login.text()).toMatch('Login Component')
		expect(router.currentRoute.name).toBe('Login')

		// TODO: move to secret manager and change credentials
		await login.find('input[type=email]').setValue('test@just-print-ngs-test.web.app')
		await login.find('input[type=password]').setValue('123456')
		await login.find('.login-btn').trigger('click')

		await Promise.all(loginPromises)

		const dashboard = wrapper.findComponent(Dashboard)
		expect(router.currentRoute.name).toBe('Dashboard')
		expect(dashboard.text()).toMatch('Test')
		expect(dashboard.text()).toMatch('פרטי התקשרות איש קשר')
		//TODO: assert state -> getter.user
	})

	it('renders an error when wrong credentials', async () => {})
})
