const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { spawn } = require("child_process");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        use: [{ loader: "babel-loader", options: { compact: false } }], // query → options
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        type: "asset/resource", // file-loader replaced in webpack 5
        generator: { filename: "img/[name]__[hash:base64:5][ext]" },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        type: "asset/resource", // file-loader replaced in webpack 5
        generator: { filename: "font/[name]__[hash:base64:5][ext]" },
      },
    ],
  },
  target: "electron-renderer",
  plugins: [
    new HtmlWebpackPlugin({ title: "buglogger" }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
  devtool: "cheap-source-map",
  devServer: {
    static: path.resolve(__dirname, "dist"), // contentBase → static in webpack 5
    client: { logging: "warn" },
    setupMiddlewares(middlewares, devServer) {
      // before() → setupMiddlewares in webpack 5
      spawn("electron", ["."], {
        shell: true,
        env: process.env,
        stdio: "inherit",
      })
        .on("close", () => process.exit(0))
        .on("error", (err) => console.error(err));
      return middlewares;
    },
  },
};
