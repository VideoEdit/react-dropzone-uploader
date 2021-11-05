/* eslint import/no-extraneous-dependencies: 0 */
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

if (process.env.NODE_ENV !== 'production') {
  throw new Error('Production builds must have NODE_ENV=production.')
}

function createConfig(entry, output) {
  return {
    mode: 'production',
    entry,
    output,
    optimization: {
      minimizer: [new UglifyJSPlugin()],
    },
    // We load react externally.
    externals: {
      "react": "react",
      "react-dom" : "reactDOM"
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          use: 'babel-loader',
          exclude: /node_modules\/react-dropzone-uploader\/node_modules/
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
          use: 'url-loader?limit=10000',
          exclude: /node_modules\/react-dropzone-uploader\/node_modules/
        },
      ],
    },
  }
}

module.exports = [
  createConfig('./src/Dropzone.js', {
    path: path.resolve('dist'),
    libraryTarget: 'commonjs2',
    filename: 'react-dropzone-uploader.js',
  }),
  createConfig('./src/Dropzone.js', {
    path: path.resolve('dist'),
    libraryTarget: 'umd',
    filename: 'react-dropzone-uploader.umd.js',
    library: 'ReactDropzoneUploader',
  }),
]
