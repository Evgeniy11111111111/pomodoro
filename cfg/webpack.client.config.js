const path = require("path");
const { HotModuleReplacementPlugin, DefinePlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === "development";
const IS_PROD = NODE_ENV === "production";
const GLOBAL_CSS_REGEXP = /\.global.scss$/
const DEV_PLUGINS = [new CleanWebpackPlugin(), new HotModuleReplacementPlugin()];
const COMMON_PLUGINS = [new DefinePlugin({'process.env.CLIENT_ID': `'${process.env.CLIENT_ID}'`})]

function setupDevtool() {
  if (IS_DEV) return "eval";
  if (IS_PROD) return false;
}

function getEntry() {
  if (IS_PROD) {
    return [path.resolve(__dirname, "../src/client/index.jsx")]
  } else {
    return [
      path.resolve(__dirname, "../src/client/index.jsx"),
      "webpack-hot-middleware/client?path=//localhost:3001/static/__webpack_hmr",
    ]
  }
}

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "react-dom": IS_DEV ? "@hot-loader/react-dom" : "react-dom",
    },
  },
  mode: NODE_ENV ? NODE_ENV : "development",
  entry: getEntry(),
  output: {
    path: path.resolve(__dirname, "../build/client"),
    filename: "client.js",
    // publicPath: "//localhost:3001/static",
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ["ts-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
            'sass-loader'
        ],
        exclude: GLOBAL_CSS_REGEXP
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ['style-loader', 'css-loader']
      },
      // {
      //   test: /\.(woff|woff2)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: 'fonts/'
      //     }
      //   }
      // }
    ],
  },
  devtool: setupDevtool(),

  plugins: IS_DEV
    ? DEV_PLUGINS.concat(COMMON_PLUGINS)
    : COMMON_PLUGINS,
};
