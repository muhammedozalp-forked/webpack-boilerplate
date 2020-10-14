const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { cssLoaders } = require('./util');

const OUTPUT_DIR = 'docs';

// configure Ouyput
const configureOutput = () => {
  return {
    path: path.resolve(__dirname, `../${OUTPUT_DIR}`),
    filename: 'vendor/js/[name].[fullhash].js',
    chunkFilename: 'vendor/js/[name].[fullhash].js',
  }
}

// configure File Loader
const configureFileLoader = () => {
  return {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]',
      outputPath: (url, resourcePath, context) => {
        if (/sources/.test(url)) {
          return url.replace('sources', '../..');
        }
      }
    },
  }
}

// configure Terser
const configureTerser = () => {
  return {
    cache: true,
    parallel: true,
    sourceMap: true,
  };
};

// configure Optimization
const configureOptimization = () => {
  return {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          enforce: true,
          chunks: 'all'
        },
        styles: {
          name: 'styles',
          test: /\.s?css$/,
          chunks: 'all',
          minChunks: 2,
          enforce: true,
        },
      }
    },
    minimizer: [new TerserPlugin(configureTerser())]
  }
}

// configure MiniCssExtract
const configureMiniCssExtract = () => {
  return {
    filename: 'vendor/css/[name].[fullhash].css',
    chunkFilename: 'vendor/css/[name].[fullhash].css',
  }
}

// configure SW
const configureSW = () => {
  return {
    clientsClaim: true,
    skipWaiting: true,
    directoryIndex: 'index.html',
    offlineGoogleAnalytics: true
  }
}

// configure Copy
const configureCopy = () => {
  return {
    patterns: [
      { from: 'sources/assets/', to: 'assets/' },
      { from: 'sources/images/', to: 'images/' }
    ]
  }
};

module.exports = merge(baseConfig, {
  mode: 'production',
  output: configureOutput(),
  target: 'es5',
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          ...cssLoaders
        ],
      },
      configureFileLoader()
    ],
  },
  optimization: configureOptimization(),
  plugins: [
    new CleanWebpackPlugin({
      dry: false,
      verbose: true
    }),
    new MiniCssExtractPlugin(
      configureMiniCssExtract()
    ),
    new WorkboxPlugin.GenerateSW(
      configureSW()
    ),
    new CopyWebpackPlugin(
      configureCopy()
    ),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true)
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: true
    }),
  ]
});