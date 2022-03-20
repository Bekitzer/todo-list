module.exports = {
	preset: '@vue/cli-plugin-unit-jest',
	setupFiles: ['<rootDir>/tests/unit/setup.js'],
	moduleFileExtensions: [
		'js',
		'json',
		// tell Jest to handle `*.vue` files
		'vue'
	],
	transform: {
		// process `*.vue` files with `vue-jest`
		'.*\\.(vue)$': 'vue-jest',
		// process `*.js` files with `babel-jest`
		'.*\\.(js)$': 'babel-jest'
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	collectCoverage: false,
	collectCoverageFrom: ['src/**/*.{js,vue}'],
	testEnvironment: '<rootDir>/tests/jest/custom-jest-environment.js',
	transformIgnorePatterns: ['<rootDir>/node_modules/(?!(vuetify/lib/locale|date-fns/locale/he)/)']
	// transformIgnorePatterns: ["<rootDir>/node_modules/(?!(vuetify|date-fns/locale|vue2-google-maps/dist/components|vuetify-google-autocomplete)/)", "\\.pnp\\.[^\\\/]+$"]
}
