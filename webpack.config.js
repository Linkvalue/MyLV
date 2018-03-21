const { DefinePlugin, IgnorePlugin, optimize: { CommonsChunkPlugin } } = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const path = require('path')
const { util } = require('config')

const { lvconnect: { appId, endpoint }, front } = util.loadFileConfigs(path.join(__dirname, 'config'))

module.exports = (env = {}) => ({
  entry: {
    index: './index.jsx',
  },
  context: path.resolve(__dirname, 'src/app'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: '[name]-[hash].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /manifest\.json$/, use: { loader: 'file-loader', options: { name: 'manifest.json' } } },
      { test: /push\.js$/, use: { loader: 'file-loader', options: { name: 'assets/scripts/push.js' } } },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: true },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: { loader: 'url-loader', options: { limit: 1, name: '[path][name]-[hash].[ext]' } },
      },
    ],
  },
  devtool: env.production ? 'source-map' : 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api/*': 'http://localhost:8001',
    },
  },
  plugins: [
    ...(env.production ? [new UglifyJSPlugin({ sourceMap: true })] : []),
    new CleanWebpackPlugin(['dist']),
    new IgnorePlugin(/node-fetch/),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.includes('node_modules')
      },
    }),
    new CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new CopyWebpackPlugin([{
      from: 'assets/images/logo',
      to: path.join(__dirname, 'dist/assets/images/logo'),
    }]),
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: 'favicon.ico',
    }),
    new OfflinePlugin({
      autoUpdate: true,
      ServiceWorker: {
        events: true,
        entry: './assets/scripts/offline.js',
      },
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV !== 'dev' ? 'production' : 'dev'}"`,
      'process.env.APP_ID': `"${appId}"`,
      'process.env.LVCONNECT_ENDPOINT': `"${endpoint}"`,
      'process.env.CONFIG': JSON.stringify(front),
    }),
  ],
})
