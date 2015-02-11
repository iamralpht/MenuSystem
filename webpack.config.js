var webpack = require('webpack');
var path = require('path');

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin()
];

if (process.env.COMPRESS) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );
}

module.exports = {
/*  output: {
    libraryTarget: 'umd',
    library: 'Slalom'
  },*/
  resolve: {
    root: path.resolve(__dirname, './src'),
    extensions: ['', '.js']
  },
  plugins: plugins,
  module: {
    loaders: [
        { test: /\.js$/, loader: 'jsx-loader' },
        { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  }
};
