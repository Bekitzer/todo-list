import Vue from 'vue'
import VueRouter from 'vue-router'
import goTo from 'vuetify/es5/services/goto'
import { getAuth } from 'firebase/auth'
import store from '@/stores'
import routes from './routes'
import config from '@/config'

Vue.use(VueRouter)

const router = new VueRouter({ ...config.ROUTER_OPTIONS, routes })

router.beforeEach((to, from, next) => {
	document.title = `${to.name} - ${process.env.VUE_APP_TITLE}`
	store.commit('setSearch', '')
	const { currentUser } = getAuth()
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
	if (requiresAuth && !currentUser) next('login')
	else if (!requiresAuth && currentUser) next('dashboard')
	else next()
})

router.afterEach((to, from) => {
	goTo(0, { duration: 0 })
})

export default router
