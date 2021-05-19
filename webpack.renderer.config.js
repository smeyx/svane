const path = require('path');
const plugins = require('./webpack.plugins.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: '/node_modules/',
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
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
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  }
}
