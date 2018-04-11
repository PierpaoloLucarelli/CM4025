const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

const config = {
  target: 'web',
  entry: './client/index.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new HtmlWebpackPlugin({ template: './client/index.html' }),
    new CopyWebpackPlugin([
   {
      from: './client/welcome.html',
      to: path.resolve(__dirname, 'dist/client')
    },
    {
      from: './client/market.pug',
      to: path.resolve(__dirname, 'dist/client')
    }
  ])
  ]
}

module.exports = config