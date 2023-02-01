const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  context: path.resolve(__dirname),
  entry: './src/index.js',
  output: {
    filename: 'default.js',
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'default.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/default',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'default.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
};

const configDev = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    open: ['/default.html'],
  },
};

const configProd = {
  mode: 'production',
};

module.exports = function (_, argv) {
  switch (argv.mode) {
    case 'production':
      return merge(config, configProd);
    case 'development':
      return merge(config, configDev);
    default:
      throw new Error('webpack invalid mode');
  }
};
