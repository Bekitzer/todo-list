module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ["<rootDir>/tests/unit/index.js"],
  moduleFileExtensions: [
    "js",
    "json",
    // tell Jest to handle `*.vue` files
    "vue"
  ],
  transform: {
    // process `*.vue` files with `vue-jest`
    ".*\\.(vue)$": "vue-jest",
    // process `*.js` files with `babel-jest`
    ".*\\.(js)$": "babel-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{js,vue}"]
}
