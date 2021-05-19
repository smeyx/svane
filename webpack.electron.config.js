const path = require('path');
const plugins = require('./webpack.plugins.js')

module.exports = ( env ) => {
  const isDev = (env && env.production ? false : true) 

  return {
    mode: isDev === false ? 'production' : 'development',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      clean: true,
    },
    plugins: plugins,
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: '/node_modules/',
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          }
        }
      ]
    },
    target: 'electron-main',
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    }
  };
};

