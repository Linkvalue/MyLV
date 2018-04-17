const {
  ContextReplacementPlugin,
  DefinePlugin,
  IgnorePlugin,
  optimize: { CommonsChunkPlugin },
} = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const SentryCliPlugin = require('@sentry/webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const OfflinePlugin = require('offline-plugin')
const path = require('path')
const { util, front: { version } } = require('config')

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
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: true },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff2?|otf|ttf)$/,
        use: { loader: 'file-loader', options: { name: 'fonts/[name]-[hash].[ext]' } },
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
    ...(env.production ? [
      new UglifyJSPlugin({ sourceMap: true }),
      new SentryCliPlugin({
        include: path.resolve(__dirname, './dist'),
        release: version,
        configFile: path.resolve(__dirname, './.sentryclirc'),
      }),
    ] : []),
    new CleanWebpackPlugin(['dist']),
    new ContextReplacementPlugin(/moment[/\\]locale$/, /fr/),
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
    new WebpackPwaManifest({
      name: 'CraCra',
      short_name: 'CraCra',
      description: 'Application de gestion des CRA/Congés.',
      background_color: '#2196f3',
      theme_color: '#2196f3',
      icons: [
        {
          src: path.resolve('src/app/assets/images/logo-lv-no-baseline.png'),
          sizes: [96, 128, 192, 256, 384, 512],
        },
      ],
    }),
    new OfflinePlugin({
      autoUpdate: true,
      ServiceWorker: {
        events: true,
        entry: './modules/serviceWorker/sw.js',
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
