const path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // library: 'libraryName',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
};
