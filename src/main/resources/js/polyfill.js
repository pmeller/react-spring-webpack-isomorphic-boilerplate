/* eslint-disable */
var global = this
var console = {}
console.debug = print
console.warn = print
console.log = print
console.error = print
console.trace = print

// When running in Nashorn, the process object doesn't exist. Define it
// so that when the React code tests for production mode, it succeeds.
process = {
  env: {
    NODE_ENV: 'production',
  },
}
