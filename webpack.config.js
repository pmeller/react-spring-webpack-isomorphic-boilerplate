const path = require('path')

const Webpack = require('webpack')
const WebpackMerge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const TARGET = process.env.npm_lifecycle_event

const SRC = path.resolve(__dirname, 'src/main')
const BUILD = path.resolve(__dirname, 'build/resources/main')
const DEST_PROTECTED = path.resolve(BUILD, 'js')
const DEST_PUBLIC = path.resolve(BUILD, 'static/app')

const PUBLIC_PATH = '/static/app/'

const commonConfig = {
  context: path.resolve(SRC, 'js'),
  output: {
    publicPath: PUBLIC_PATH,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'eslint-loader',
        enforce: 'pre',
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
}

const ssrConfig = {
  entry: './ssr',
  output: {
    path: DEST_PROTECTED,
    filename: 'ssr.js',
    library: 'SSR',
  },
}

const clientDevConfig = {
  entry: './client-dev',
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ],
      },
    ],
  },
  devServer: {
    overlay: true,
    port: 9090,
    proxy: {
      '/': {
        target: 'http://localhost:8080',
        secure: false,
        prependPath: false,
      },
    },
    publicPath: 'http://localhost:9090' + PUBLIC_PATH,
  },
}

const clientProdConfig = {
  entry: './client',
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'sass-loader']),
      },
    ],
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new UglifyJSPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
    }),
  ],
}

const clientCommonConfig = {
  devtool: 'source-map',
  output: {
    path: DEST_PUBLIC,
    filename: 'client.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: path.resolve(SRC, 'resources/templates/index.html'),
      filename: path.resolve(BUILD, 'templates/index.html'),
    }),
  ],
}

const clientConfig = WebpackMerge(clientCommonConfig, TARGET === 'build' ? clientProdConfig : clientDevConfig)

const multiConfig = [
  WebpackMerge(commonConfig, clientConfig),
]

if (TARGET === 'build') {
  multiConfig.push(
    WebpackMerge(commonConfig, ssrConfig)
  )
}

module.exports = multiConfig
