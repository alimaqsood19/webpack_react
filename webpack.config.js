var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
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
    filename: '[name].[chunkhash].js' //[name] will be replaced with the key from the entry section
    //chunkhash is a hash of the contents of the file, everytime our bundle.js is updated, it hashes the content and spits it out as chunkhash
    //this allows the browser to download the new bundle.js if it was updated rather than loading the cached bundle.js
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
      names: ['vendor', 'manifest'] //third js file called manifest.js, its purpose is to give the browser a better understanding if vendor.js has actually changed
      //tells webpack to look at the total sum of all our project files, our bundle and vendor entry point
      //any modules that are duplicates between the two, pull it out and only include it in the vendor output 
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html' //use this index.html located in src folder as a template to begin with, this plugin basically creates
      //all the necessary script tags for all the code splitting that we do in our project
      //puts the new index.html with the updated script tags in the output filepath 'dist'
    }),
    new webpack.DefinePlugin({ //DefinePlugin used to define window scope variables that will be defined within our javascript output files (bundle.js);
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) //ensures it is in production
      //NODE_ENV, global scope property (window scope), if it is equal to production React will act differently
    })
  ]
};
