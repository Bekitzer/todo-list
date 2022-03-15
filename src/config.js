const env = process.env.NODE_ENV || 'development'

const defaults = {
  DATE_FORMAT: 'EEEEE, dd/MM/yy'
}

const config = {
  development: {},
  staging: {},
  production: {}
}

export default {...defaults, ...config[env]}