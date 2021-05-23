const webpack = require('webpack');
const path = require('path');
const plugins = require('./webpack.plugins.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypescript = require('react-refresh-typescript');

module.exports = ( env ) => {
  const isDev = (env && env.production ? false : true) 

  return {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'eval-cheap-source-map' : false,
    entry: './src/renderer.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]-renderer.js',
    },
    plugins: [
      ...plugins,
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        title: 'NBA Scores - SVANE',
      }),
      new webpack.HotModuleReplacementPlugin(), // global HMR
      new ReactRefreshWebpackPlugin()
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: '/node_modules/',
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: isDev ? [ ReactRefreshTypescript() ] : [],
              }),
            },
          },
        },
        {
          test: /\.css$/,
          use: [ { loader: 'style-loader' }, { loader: 'css-loader' }],
        }
      ],
    },
    target: 'electron-renderer',
    devServer: {
      contentBase: './dist',
      port: 3000,
      hot: true,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  }
}
