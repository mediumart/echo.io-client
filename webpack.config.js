var webpack = require('webpack');

module.exports = {
    name: 'default',
    entry: './index.js',
    output: {
        library: 'io',
        libraryTarget: 'umd',
        filename: './dist/echo.io.js'
    },
    externals: {
      global: glob()
    },
    devtool: 'source-map',
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
            screw_ie8: false
        },
        mangle: {
            screw_ie8: false
        },
        output: {
            screw_ie8: false,
            beautify: false
        }
      })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: { presets: ['env'] }
        }, {
            test: /\json3.js/,
            loader: 'imports?define=>false'
        }]
    }
};

/**
 * Populates `global`.
 *
 * @api private
 */

function glob () {
    return 'typeof self !== "undefined" ? self : ' +
        'typeof window !== "undefined" ? window : ' +
        'typeof global !== "undefined" ? global : {}';
}