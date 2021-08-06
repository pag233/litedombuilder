const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development' ? true : false;
  return {
    entry: path.join(__dirname, 'src', 'index.ts'),
    output: {
      path: path.join(__dirname, 'dist'),
      filename: isDev ? "[name].js" : "[name]-[chunkhash:8].js",
      chunkFilename: '[name][id].js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s(a|c)ss$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDev
              }
            }
          ],
          exclude: /node_modules/,
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./template.html"
      }),
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[hash:8].css',
        chunkFilename: isDev ? '[id].css' : '[id].[hash:8].css'
      }),
      new CleanWebpackPlugin()
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.scss'],
    },
    devtool: "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, './dist'),
      hot: true,
      open: true,
      // inline: true,
      host: 'localhost',
      port: 8800,
      watchOptions: {
        ignored: [
          path.resolve(__dirname, 'src/__tests__'),
          path.resolve(__dirname, 'node_modules')
        ]
      }
    }
  };
}