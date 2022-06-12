const { plugins } = require('@babel/preset-env/lib/plugins-compat-data');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, ' dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module:{
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test:/\.html$/,
        use: [
          {
            loader: 'html-loader',
          }
        ]
      },
      {
        test:/\.(css|scss)$/,
        use:[
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|svg|jpeg|webp)$/,
      /*aquí en test agregas la expresión regular para procesar los diferentes tipos de imagenes que tengas.*/
            type: 'asset/resource',
            generator: {
              filename: 'assets/pictures/[hash][ext]',
		/*aquí en filename pones la carpeta en donde quieres que se guarden tus imagenes (le agrego el [hash] para evitar problemas con el cache, además [ext] hace referencia a la extensión del archivo que se haya procesado).*/
            }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject:true,
      template: './public/index.html',
      filename: './index.html'
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css'
  })
  ],
  devServer:{
    historyApiFallback: true,
    static: path.join(__dirname, 'dist'),
        compress:true,
        historyApiFallback: true,
        port:3005,
  }
}