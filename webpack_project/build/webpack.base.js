const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].chunk.js",
    path: resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "img/",
            limit: 2048,
          },
        },
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: "file-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "../index.html"),
    }),
    new CleanWebpackPlugin([resolve(__dirname, "../dist")], {
      root: resolve(__dirname, "../"),
    }),
    new webpack.ProvidePlugin({
      // 当发现一个模块里用了$，就会在该模块引入jquery
      $: 'jquery',
    })
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: "all",
    },
  },
};
