const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      utils: path.resolve(__dirname, 'src/utils/')
    }
  },
  devServer: {
    historyApiFallback: true,
    overlay: true
  },
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: [htmlPlugin]
};