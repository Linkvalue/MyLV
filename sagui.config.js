const { DefinePlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const { util } = require('config')
const { lvconnect: { appId } } = util.loadFileConfigs(path.join(__dirname, 'config'))

/**
 * Sagui configuration object
 * see: http://sagui.js.org/
 */
module.exports = {
  pages: ['index'],
  develop: {
    proxy: {
      '/api/*': 'http://localhost:8001'
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
      }, {
        from: path.resolve(__dirname, 'node_modules/material-design-lite/dist/material.blue-light_blue.min.css'),
        to: path.resolve(__dirname, 'dist/assets/mdl')
      }, {
        from: path.resolve(__dirname, 'node_modules/material-design-lite/dist/material.min.js'),
        to: path.resolve(__dirname, 'dist/assets/mdl')
      }]),
      new DefinePlugin({
        'process.env.NODE_ENV': `"${process.env.NODE_ENV !== 'dev' ? 'production' : 'dev'}"`,
        'process.env.APP_ID': `"${appId}"`
      })
    ]
  }
}
