var webpack = require('webpack');
var path = require('path');
const VENDOR_LIBS = [ //each string is the name of the library we want to include in the separate vendor file
  'react', 'lodash', 'redux', 'react-redux', 'react-dom', 'faker', 'react-input-range', 'redux-form', 'redux-thunk'
]; //so these are all the module dependicies that are required for our app to work, they will be bundled in a seperate file vendor.js

module.exports = {
  entry: {
    //having the entry point as an object allows us to have multiple entry points which 
    //means this allows us to separate my code, from the vendor code i.e the third party libraries such as react
    bundle: './src/index.js', //output will be bundle.js since the key is bundle and we will start at the specified path 
    vendor: VENDOR_LIBS //adding a new key, we are telling webpack to create an entirely separate bundle file with the name vendor.js
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js' //[name] will be replaced with the key from the entry section
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/   //Do not try to apply babel that are any files that are located in the node_modules directory
      },
      {
        use: ['style-loader', 'css-loader'], //remember right to left
        test: /\.css$/
      }
    ]
  },
  plugins: [ 
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor' 
    })
  ]
};
//tells webpack to look at the total sum of all our project files, our bundle and vendor entry point
//any modules that are duplicates between the two, pull it out and only include it in the vendor output