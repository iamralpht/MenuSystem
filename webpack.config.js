var webpack = require('webpack');

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
  plugins: plugins,
  module: {
    loaders: [
        { test: /\.js$/, loader: 'jsx-loader' },
        { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  }
};
