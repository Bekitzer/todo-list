const env = process.env.NODE_ENV || 'development'

if (env !== 'production') console.debug('current environment:', env)

import he from 'vuetify/lib/locale/he'

const defaults = {
	DATE_FORMAT: 'EEEEE, dd/MM/yy',
	ROUTER_OPTIONS: {
		mode: 'history',
		base: process.env.BASE_URL
	},
	VUETIFY_USE: {
		iconfont: 'jp',
		icons: {
			order: 'jp-order',
			client: 'jp-client'
		}
	},
	VUETIFY_INSTANCE: {
		rtl: true,
		lang: {
			locales: { he },
			current: 'he'
		}
	}
}

const config = {
	development: {
		productionTip: true,
		firebaseConfig: {
			apiKey: 'AIzaSyA3PX7Z-yWGJSvbecML9EwaeaFCirb-_Kk',
			authDomain: 'just-print-ngs-dev.firebaseapp.com',
			projectId: 'just-print-ngs-dev',
			storageBucket: 'just-print-ngs-dev.appspot.com',
			messagingSenderId: '664580712157',
			appId: '1:664580712157:web:cf312b122523907c49dd34',
			measurementId: 'G-NQTE2DSY6E'
		}
	},
	testing: {
		productionTip: false,
		firebaseConfig: {
			apiKey: 'AIzaSyC7Czu5PHlhwmfgxCQWggC-gIxEPNEQBA4',
			authDomain: 'just-print-ngs-test.firebaseapp.com',
			projectId: 'just-print-ngs-test',
			storageBucket: 'just-print-ngs-test.appspot.com',
			messagingSenderId: '668365241999',
			appId: '1:668365241999:web:cd3933d00274ab97813afa',
			measurementId: 'G-RR4GJ1X1JJ'
		}
	},
	staging: {},
	production: {
		productionTip: false,
		firebaseConfig: {
			apiKey: 'AIzaSyDKRDIueceXgFm4DCCo6Tt1_fTiG_RQ_Uc',
			authDomain: 'just-print-ngs.firebaseapp.com',
			databaseURL: 'https://just-print-ngs-default-rtdb.firebaseio.com',
			projectId: 'just-print-ngs',
			storageBucket: 'just-print-ngs.appspot.com',
			messagingSenderId: '38410968724',
			appId: '1:38410968724:web:a56800ce30fbd46dc55e81',
			measurementId: 'G-LS8EQX32HV'
		}
	}
}

export default { ...defaults, ...config[env] }
