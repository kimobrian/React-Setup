const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
require("dotenv").config();

module.exports = {
  entry: { app: __dirname + "/app/app.js"},
  output: {
    path: __dirname + "/dist",
    chunkFilename: "[name].[hash].bundle.js",
    filename: "[name]-bundle.js"
  },
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
        "NODE_ENV": "production"
      },
      API_URL: JSON.stringify(process.env.API_URL)
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
