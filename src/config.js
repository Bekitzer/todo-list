const env = process.env.NODE_ENV || 'development'

console.log(process.env.NODE_ENV)

const defaults = {
  DATE_FORMAT: 'EEEEE, dd/MM/yy'
}

const config = {
  ...defaults,
  development: {
  }
}

export default config[env]