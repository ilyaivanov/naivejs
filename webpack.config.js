const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  return {
    entry: "./src/app.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[chunkhash].js",
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        { test: /\.ts$/, use: "ts-loader" },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html",
      }),
      new MiniCssExtractPlugin({
        filename:"[chunkhash].css"
      }),
      isProd ? new CleanWebpackPlugin() : undefined,
    ].filter((x) => x),
  };
};
