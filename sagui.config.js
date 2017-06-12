const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

/**
 * Sagui configuration object
 * see: http://sagui.js.org/
 */
module.exports = {
  pages: ['index'],
  develop: {
    proxy: {
      '/api/*': 'http://localhost:8000'
    }
  },
  webpack: {
    plugins: [
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, 'src/{manifest.json,favicon.ico}'),
        to: path.resolve(__dirname, 'dist')
      }, {
        from: path.resolve(__dirname, 'src/app/assets'),
        to: path.resolve(__dirname, 'dist/assets')
      }, {
        from: path.resolve(__dirname, 'node_modules/material-design-icons/sprites/svg-sprite'),
        to: path.resolve(__dirname, 'dist/icons')
      }])
    ]
  }
}
