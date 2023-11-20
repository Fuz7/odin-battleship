const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',

  entry: {
    main: './src/script/main.js',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/fonts/[name].[ext]', // To set asset/resources names
    clean: true,
  },

  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    client: {
      logging: 'warn',
      overlay: {
        errors: false,
        warnings: false,
        runtimeErrors: false,
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dynamic User Interface',
      template: './src/main.html',
    }),

    new MiniCssExtractPlugin({
      filename: 'styles.css', // Output CSS filename
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                { targets: '>0.25%', useBuiltIns: 'usage', 'corejs': 3 },
              ],
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: 3, // Correct usage of corejs option
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          process.env.NODE_ENV === 'development' // To make css watchable
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]', // Output image filename with image/ prefix
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ],
  },
};