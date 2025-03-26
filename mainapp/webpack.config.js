const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    port: 3000,
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
      name: 'mainapp',
      filename: 'remoteEntry.js',
      exposes: {
        './EventBus': './src/eventBus',
      },
      remotes: {
        app2: "app2@http://localhost:3002/remoteEntry2.js",
        app1: "app1@http://localhost:3001/remoteEntry1.js"
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true },rxjs: { singleton: true, eager: true } },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
