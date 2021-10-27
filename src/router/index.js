import Vue from 'vue'
import VueRouter from 'vue-router'
import goTo from 'vuetify/es5/services/goto'
import firebase from 'firebase/compat/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../components/Form/Dashboard.vue'),
    meta: {
       requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Form/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Form/Register.vue'),
    meta: {
      requiresGuest: true
   }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
       requiresAuth: true
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/Orders.vue'),
    meta: {
       requiresAuth: true
    }
  },
  {
    path: '/orders/:id',
    name: 'Order',
    component: () => import('../views/Order.vue'),
    props:true,
    meta: {
       requiresAuth: true
    }
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import('../views/Clients.vue'),
    meta: {
       requiresAuth: true
    }
  },
  {
    path: '/clients/:id',
    name: 'Client',
    component: () => import('../views/Client.vue'),
    props:true,
    meta: {
       requiresAuth: true
    }
  },
  {
    path: '/suppliers',
    name: 'Suppliers',
    component: () => import('../views/Suppliers.vue'),
    meta: {
       requiresAuth: true
    }
  },
  {
    path: '/suppliers/:id',
    name: 'Supplier',
    component: () => import('../views/Supplier.vue'),
    props:true,
    meta: {
       requiresAuth: true
    }
  },
  {
    path: '/accountings',
    name: 'Accountings',
    component: () => import('../views/Accountings.vue'),
    meta: {
       requiresAuth: true
    }
  },
  {
    path: '/accountings/:id',
    name: 'Accounting',
    component: () => import('../views/Accounting.vue'),
    props:true,
    meta: {
       requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  document.title = `${ to.name } - ${ process.env.VUE_APP_TITLE }`
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('dashboard')
  else next();
})
router.afterEach((to, from) => {
  goTo(0, ({ duration:0 }))
})

export default router
