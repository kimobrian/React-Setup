var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: __dirname + "/app/app.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.json$/, loader: "json"
            },
            {
                test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'
            },
            {
                test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html",
            inject: 'body'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("[name]-[hash].css"),
        new webpack.optimize.UglifyJsPlugin
    ]
}
