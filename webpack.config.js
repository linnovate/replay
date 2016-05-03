'use strict';

function addHash(template, hash) {
  return !debug ? template.replace(/\.[^.]+$/, `.[${hash}]$&`) : template;
}

const debug = process.env.NODE_ENV !== 'production',
      path    = require('path'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'sourcemap',
  entry: {},
  module: {
    loaders: [
       { test: /\.js$/, include: /client/, loader: 'ng-annotate!babel' },
       { test: /\.html$/, loader: 'raw' },
       { test: /\.styl$/, loader: 'style!css!stylus' },
       { test: /\.css$/, loader: 'style!css' },
       { test: /\.(gif|png|jpg|jpeg|svg|eot|woff2|woff|ttf)$/,
        loader: debug ? 'file?name=assets/[path][name].[hash:6].[ext]' : 'file?name=assets/[hash].[ext]' },
       { test: /leaflet-src.js$/, loader: 'exports?L' },
       { test: /dash.all.debug.js$/, loader: 'exports?dashjs' },
    ]
  },
  resolve: {
    root: [
      path.join(__dirname, 'bower_components'),
      path.join(__dirname, 'vendor')
    ],
    alias: {
      'dashjs$': 'dashjs/dash.all.debug',
    }
  },
  externals: {
    gapi: 'gapi'
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      hash: true
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    })
  ]
};
