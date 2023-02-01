const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

const config = {
  context: path.resolve(__dirname),
  entry: './src/index.js',
  output: {
    filename: 'default.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
      title: 'Ctrl.IChat',
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'default.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015',
          loader: 'jsx',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015', // Syntax to compile to (see options below for possible values)
        css: true,
      }),
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
