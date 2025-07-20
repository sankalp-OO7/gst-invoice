import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

/** @type {import('webpack').Configuration} */
export default {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    publicPath: '/', // For SPA routing
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],

  // 🛠️ FIX STARTS HERE
  devServer: {
    // Do NOT serve from any folder, just let webpack do it in-memory
    static: false,
    port: 3000,
    hot: true,
    historyApiFallback: true, // SPA routing
    devMiddleware: {
      writeToDisk: false,
    },
  },
};
