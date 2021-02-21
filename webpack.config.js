const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const fs = require('fs');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [new OptimizeCssAssetPlugin(), new TerserWebpackPlugin()];
  }
  return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
        sourceMap: isDev,
      },
    },
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};

const babelOptions = (preset) => {
  const opts = {
    presets: ['@babel/preset-env'],
  };
  if (preset) {
    opts.presets.push(preset);
  }
  return opts;
};

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: babelOptions(),
    },
  ];
  const eslintLoader = {
    loader: 'eslint-loader',
  };
  if (isDev) {
    loaders.push(eslintLoader);
  }
  return loaders;
};

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/',
};

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
const PAGES_DIR = `${PATHS.src}/page/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter((fileName) => fileName.endsWith('.pug'));

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.ts'],
    // some other entry point
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/range-slider/',
  },
  resolve: {
    extensions: ['.jsx', '.ts', '.js'],
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    ...PAGES.map(
      (page) =>
        new HTMLWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page.replace(/\.pug/, '.html')}`,
        })
    ),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: jsLoaders(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript'),
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react'),
        },
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: false,
          spriteFilename: './assets/img/icons/icons.svg',
          runtimeCompat: true,
        },
      },
    ],
  },
};
