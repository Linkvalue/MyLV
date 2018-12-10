module.exports = {
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      modules: 'commonjs',
      useBuiltIns: 'usage',
    }],
  ],
  plugins: [
    'react-hot-loader/babel',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
  env: {
    test: {
      presets: [
        '@babel/preset-react',
        ['@babel/preset-env', {
          modules: 'commonjs',
          useBuiltIns: 'usage',
        }],
      ],
    },
  },
}
