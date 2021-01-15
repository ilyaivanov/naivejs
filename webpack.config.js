const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  return {
    entry: "./app.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "[chunkhash].js" : "main.js",
    },
    plugins: [
      new HtmlWebpackPlugin(),
      isProd ? new CleanWebpackPlugin() : undefined,
    ].filter(x => x),
  };
};
