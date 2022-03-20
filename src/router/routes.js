const routes = [
	{
		path: '*',
		redirect: '/login'
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('../views/Home'),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: () => import('../components/Profile/Dashboard'),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../components/Form/Login')
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('../components/Form/Register'),
		meta: {
			requiresGuest: true
		}
	},
	{
		path: '/terms',
		name: 'Terms',
		component: () => import('../views/Terms'),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/privacy',
		name: 'Privacy',
		component: () => import('../views/Privacy'),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/products',
		name: 'Products',
		component: () => import('../views/Products'),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/products/:id',
		name: 'Product',
		component: () => import('../views/Product'),
		props: true,
		meta: {
			requiresAuth: true,
			back: 'Products'
		}
	},
	{
		path: '/orders',
		name: 'Orders',
		component: () => import('../views/Orders'),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/orders/:id',
		name: 'Order',
		component: () => import('../views/Order'),
		props: true,
		meta: {
			requiresAuth: true,
			back: 'Orders'
		}
	},
	{
		path: '/clients',
		name: 'Clients',
		component: () => import('../views/Clients'),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/clients/:id',
		name: 'Client',
		component: () => import('../views/Client'),
		props: true,
		meta: {
			requiresAuth: true,
			back: 'Clients'
		}
	},
	{
		path: '/suppliers',
		name: 'Suppliers',
		component: () => import('../views/Suppliers'),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/suppliers/:id',
		name: 'Supplier',
		component: () => import('../views/Supplier'),
		props: true,
		meta: {
			requiresAuth: true,
			back: 'Suppliers'
		}
	},
	{
		path: '/users',
		name: 'Users',
		component: () => import('../views/Users'),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/users/:id',
		name: 'User',
		component: () => import('../views/User'),
		props: true,
		meta: {
			requiresAuth: true,
			back: 'Users'
		}
	}
]

export default routes
