const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { execSync } = require('child_process');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

const IS_DEBUG = process.env.PLUFF_DEBUG === 'true';
const IS_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') >= 0;

console.log(`Building for ${IS_DEBUG ? 'DEVELOPMENT' : 'production'}!`);

// Get the current git commit hash.
const commitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();

// Plugins that are used for all environments.
const plugins = [
  // Prevent including all locales of moment.
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  // Main static file.
  new HtmlWebPackPlugin({
    inject: 'head',
    template: 'app/index.htm',
    // `output.publicPath` is "static/" when not using the dev-server,
    // but we want the index.html one level above it.
    filename: `${IS_DEV_SERVER ? '' : '../'}index.html`,
    commitHash,
  }),
  new ExtractTextPlugin({
    filename: '[name]-[contenthash:7].css',
    allChunks: true,
  }),
  // Define globals that get inserted in plugin.
  new webpack.DefinePlugin({
    __DEV__: IS_DEBUG,
  }),
];

if (!IS_DEBUG) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    // UglifyJs produces nonsense warnings by default.
    compress: { warnings: false },
    // Mangling fucks up Angular.
    mangle: false,
  }));
}

export default {
  context: __dirname,
  entry: {
    bundle: 'boot.js',
  },
  devtool: IS_DEBUG ? '#eval' : false,
  output: {
    filename: '[name]-[hash:7].js',
    chunkFilename: '[name]-[id]-[chunkhash:7].js',
    path: path.join(__dirname, 'dist/static'),
    publicPath: IS_DEV_SERVER ? '/' : 'static/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        // Nasty hack to work around a bug in html-webpack-plugin / extract-text-webpack-plugin,
        // where the output is wrong if you're using an inline loader.
        test: /\.htm$/,
        loader: 'underscore-template-loader',
        options: {
          // html attributes that should be parsed as module.
          attributes: ['img:src', 'link:href'],
        },
      }, {
        test: /\.html$/,
        loader: 'raw-loader',
      }, {
        test: /\.scss$/,
        // First compile with Sass and then Postcss.
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader?sourceMap!' +
            'postcss-loader!' +
            'sass-loader?sourceMap&outputStyle=compressed',
          // Paths in CSS are relative to dist/static/ instead of dist/
          publicPath: '',
        }),
      }, {
        // Extract all non-CSS and non-JS assets.
        test: /\.(gif|png|jpe?g|svg|ico|woff|ttf)$/i,
        loader: 'file-loader',
        options: {
          name: '[name]-[hash:7].[ext]',
        },
      },
    ],
  },
  plugins,
  resolve: {
    modules: [path.join(__dirname, 'app'), 'node_modules'],
    alias: {
      'angular-translate-cookie': 'angular-translate/dist/angular-translate-storage-cookie/angular-translate-storage-cookie',
    },
  },
  devServer: {
    stats: 'errors-only',
    historyApiFallback: true,
  },
};
