import Vue from 'vue'
import VueRouter from 'vue-router'
import goTo from 'vuetify/es5/services/goto'
import firebase from 'firebase/compat/app'
import store from "@/stores"

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiresAuth: true
   }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../components/Profile/Dashboard.vue'),
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
    path: '/terms',
    name: 'Terms',
    component: () => import('../views/Terms.vue'),
    meta: {
       requiresAuth: true
    }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('../views/Privacy.vue'),
    meta: {
       requiresAuth: true
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue'),
    meta: {
       requiresAuth: true
    }
  },
  {
    path: '/products/:id',
    name: 'Product',
    component: () => import('../views/Product.vue'),
    props:true,
    meta: {
       requiresAuth: true,
       back: "Products"
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
       requiresAuth: true,
       back: "Orders"
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
       requiresAuth: true,
       back: "Clients"
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
       requiresAuth: true,
       back: "Suppliers"
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    meta: {
       requiresAuth: true
    }
  },
  {
    path: '/users/:id',
    name: 'User',
    component: () => import('../views/User.vue'),
    props:true,
    meta: {
       requiresAuth: true,
       back: "Users"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  document.title = `${ to.name } - ${ process.env.VUE_APP_TITLE }`
  store.commit('setSearch', '')
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
