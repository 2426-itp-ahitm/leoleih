// Generated using webpack-cli https://github.com/webpack/webpack-cli
import CopyWebpackPlugin from "copy-webpack-plugin";
import { resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.ts",
  output: {
    path: resolve("target"),
  },
  devtool: "cheap-source-map",
  devServer: {
    open: true,
    host: "localhost",
    port: 4200,
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:8080",
        changeOrigin: true,
        logLevel: "debug",
        secure: false,
        ws: true,
        historyApiFallback: true,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      hash: true,
      scriptLoading: "module",
      favicon: "./assets/favicon.svg",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "styles", to: "styles" },
        { from: "assets", to: "assets" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\-(template\.html)$/,
        use: [resolve("./", "src", "lib", "loaders", "template-loader.js")],
        exclude: /node_modules/,
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    alias: { Model: resolve("src/model") },
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};

export default () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
