'use strict';

const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const ManifestPlugin = require('webpack-manifest-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const defaultConfig = require('@wordpress/scripts/config/webpack.config');

const modules = require('./scripts/modules');

// Get environment variables to inject into our app.
const env = require('./scripts/env')();

const isProduction = process.env.NODE_ENV === 'production';

const plugins = defaultConfig.plugins.map(plugin => {
  if (plugin instanceof MiniCssExtractPlugin) {
    return new MiniCssExtractPlugin({
      esModule: false,
      filename: isProduction ? '[name].[contenthash:8].css' : '[name].css',
      chunkFilename: isProduction
        ? 'css/[name].[contenthash:8].chunk.css'
        : !isProduction && 'css/[name].chunk.css'
    });
  } else {
    return plugin;
  }
});

module.exports = {
  ...defaultConfig,
  // Stop compilation early in production
  bail: isProduction,
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  output: {
    ...defaultConfig.output,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: !isProduction,
    // Webpack uses `publicPath` to determine where the app is being served from.
    // It requires a trailing slash, or the file assets will get an incorrect path.
    publicPath: '../wp-content/plugins/abtfr/admin/admin-app/build/',
    // TODO: remove this when upgrading to webpack 5
    futureEmitAssets: true,
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: isProduction
      ? 'js/[name].[contenthash:8].chunk.js'
      : !isProduction && 'js/[name].chunk.js',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: isProduction
      ? info =>
          path.relative('src', info.absoluteResourcePath).replace(/\\/g, '/')
      : !isProduction &&
        (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'))
  },
  optimization: {
    ...defaultConfig.optimization,
    minimizer: [
      ...defaultConfig.optimization.minimizer,
      // This is only used in production mode
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: true
            ? {
                // `inline: false` forces the sourcemap to be output into a
                // separate file
                inline: false,
                // `annotation: true` appends the sourceMappingURL to the end of
                // the css file, helping the browser find the sourcemap
                annotation: true
              }
            : false
        },
        cssProcessorPluginOptions: {
          preset: ['default', { minifyFontValues: { removeQuotes: false } }]
        }
      })
    ],
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    // https://github.com/facebook/create-react-app/issues/5358
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    }
  },
  resolve: {
    alias: {
      ...defaultConfig.resolve.alias,
      ...(modules.webpackAliases || {})
    },
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin('src', ['package.json'])
    ]
  },
  plugins: [
    ...plugins,
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV is set to production
    // during a production build.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env.stringified),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebook/create-react-app/issues/240
    !isProduction && new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebook/create-react-app/issues/186
    !isProduction && new WatchMissingNodeModulesPlugin('node_modules'),
    // Generate an asset manifest file with the following content:
    // - "files" key: Mapping of all asset filenames to their corresponding
    //   output file so that tools can pick it up without having to parse
    //   `index.html`
    // - "entrypoints" key: Array of files which are included in `index.html`,
    //   can be used to reconstruct the HTML if necessary
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: '/',
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.index.filter(
          fileName => !fileName.endsWith('.map')
        );

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles
        };
      }
    }),
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ['css']
    }),
    new StylelintPlugin({
      files: 'src/**/*.css',
      fix: true,
      failOnError: isProduction
    })
  ].filter(Boolean),
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  // Turn off performance processing because we utilize
  // our own hints via the FileSizeReporter
  performance: false
};
