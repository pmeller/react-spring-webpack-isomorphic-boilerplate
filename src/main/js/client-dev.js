import './client.js'

function resetStyles () {
  [].forEach.call(document.querySelectorAll('link[rel=stylesheet]'), (style) => {
    style.parentNode.removeChild(style)
  })
}

// disable all styles provided with index.html to reduce
// possibility of conflicts with styles provided by webpack-dev-server
resetStyles()

if (module.hot) {
  module.hot.accept()
}
