const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
require("dotenv").config();

module.exports = {
  devtool: "source-map",
  entry: __dirname + "/app/app.js",
  mode: "development",
  output: {
    path: __dirname + "/dist",
    filename: "[name]-bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, exclude: [/node_modules/, /bower_components/], use: "babel-loader"
      },
      {
        test: /\.s?css$/, use: ExtractTextPlugin.extract(
          {
            fallback: "style-loader",
            use: ["css-loader", "sass-loader"]
          }
        )
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: __dirname + "/app/index.tmpl.html",
      inject: "body"
    }),
    new webpack.BannerPlugin("React Webpack Setup. Inc"),
    new ExtractTextPlugin("style.bundle.css"),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin(
      {
        API_URL: JSON.stringify(process.env.API_URL)
      }
    )
  ]
};
