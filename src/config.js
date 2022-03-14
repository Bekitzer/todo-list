const env = process.env.NODE_ENV || 'development'

const defaults = {
  DATE_FORMAT: 'EEEEE, dd/MM/yy'
}

const config = {
  development: {
    ...defaults
  }
}

export default config[env]