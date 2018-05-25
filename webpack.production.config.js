/*eslint-disable no-process-env*/
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
require("dotenv").config();

module.exports = {
  entry: { app: __dirname + "/app/app.js" },
  output: {
    path: __dirname + "/dist",
    chunkFilename: "[name].[hash].bundle.js",
    filename: "[name]-bundle.js"
  },
  mode: "production",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, exclude: /node_modules/, use: "babel-loader"
      },
      {
        test: /\.css$/, loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }
    ]
  },
  node: {
    net: "empty",
    tls: "empty",
    dns: "empty",
    fs: "empty"
  },
  optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all" }
  //     },
  //     chunks: "all"
  //   }
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor_app",
          chunks: "all",
          minChunks: 2
        }
      }
    }
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html",
      inject: "body"
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin("style.bundle.css"),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new CleanWebpackPlugin(["dist"]),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      },
      "API_URL": JSON.stringify(process.env.API_URL)
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast 
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    })
  ]
};
