const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

/**
 * Sagui configuration object
 * see: http://sagui.js.org/
 */
module.exports = {
  pages: ['index'],
  webpack: {
    plugins: [
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, 'src/manifest.json'),
        to: path.resolve(__dirname, 'dist')
      }, {
        from: path.resolve(__dirname, 'src/images/logo'),
        to: path.resolve(__dirname, 'dist/images/logo')
      }, {
        from: path.resolve(__dirname, 'node_modules/material-design-icons/sprites/svg-sprite'),
        to: path.resolve(__dirname, 'dist/icons')
      }, {
        from: path.resolve(__dirname, 'src/service-worker/offline-mode.js'),
        to: path.resolve(__dirname, 'dist')
      }])
    ]
  }
}
