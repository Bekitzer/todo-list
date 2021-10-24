import Vue from 'vue'
import VueRouter from 'vue-router'
import goTo from 'vuetify/es5/services/goto'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/Orders.vue')
  },
  {
    path: '/orders/:id',
    name: 'Order',
    component: () => import('../views/Order.vue'),
    props:true
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import('../views/Clients.vue')
  },
  {
    path: '/clients/:id',
    name: 'Client',
    component: () => import('../views/Client.vue'),
    props:true
  },
  {
    path: '/suppliers',
    name: 'Suppliers',
    component: () => import('../views/Suppliers.vue')
  },
  {
    path: '/suppliers/:id',
    name: 'Supplier',
    component: () => import('../views/Supplier.vue'),
    props:true
  },
  {
    path: '/accountings',
    name: 'Accountings',
    component: () => import('../views/Accountings.vue')
  },
  {
    path: '/accountings/:id',
    name: 'Accounting',
    component: () => import('../views/Accounting.vue'),
    props:true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${ to.name } - ${ process.env.VUE_APP_TITLE }`
  next()
})
router.afterEach((to, from) => {
  goTo(0, ({ duration:0 }))
})

export default router
