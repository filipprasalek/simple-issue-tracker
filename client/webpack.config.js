const path = require('path');
const DefinePlugin = require('webpack').DefinePlugin;
const HtmlWebPackPlugin = require("html-webpack-plugin");


const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});

const definePlugin = new DefinePlugin({
  'process.env': {
    SERVER_URL: JSON.stringify('http://localhost:3000')
  }
})

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      lib: path.resolve(__dirname, 'src/lib/'),
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
  plugins: [htmlPlugin, definePlugin]
};