/*eslint-disable no-process-env*/
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
require("dotenv").config();
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: __dirname + "/app/app.js",
  output: {
    path: __dirname + "/dist",
    filename: "[name]-bundle.js",
    publicPath: "/"
  },
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
    inline: true,
    hot: true,
    port: 7700
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/, /bower_components/
        ],
        use: "babel-loader"
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: __dirname + "/app/index.tmpl.html",
      inject: "body"
    }),
    new webpack.BannerPlugin("O'Brian Webpack Setup. Inc"),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("style.bundle.css"),
    new webpack.HashedModuleIdsPlugin(),
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      "API_URL": JSON.stringify(process.env.API_URL)
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast 
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    })
  ]
};
