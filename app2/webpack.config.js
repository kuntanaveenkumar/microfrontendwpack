const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3002,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [    
    new ModuleFederationPlugin({
      name: "app2",
      filename: 'remoteEntry2.js',
      exposes: {
        "./App2": "./src/App2"
      },
      remotes: {
        mainapp: "mainapp@http://localhost:3000/remoteEntry.js"
      },
      shared: {react: {singleton: true,requiredVersion:false}, "react-dom": {singleton: true},rxjs: { singleton: true, eager: true }},
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
