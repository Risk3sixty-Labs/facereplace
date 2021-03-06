var nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'production',
  entry: [
    'core-js/stable',
    'regenerator-runtime/runtime',
    './src/bin/facereplace.js'
  ],
  target: 'node',
  node: {
    __dirname: false
  },
  output: {
    filename: 'facereplace',
  },
  externals: [ nodeExternals() ],
  module: {
    rules: [{
      test: /\.m?js$/,
      loader: 'babel-loader',
    }]
  }
}
