const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, '../build'),
        filename: `[name].[contentHash].js`,
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    plugins: [
        new CleanWebpackPlugin(['build'], {
            root: __dirname + '/..'
        }),
        new CopyWebpackPlugin([
            {
                from: 'public/icon.png',
                to: '.',
            },
        ]),
    ],
    resolve: {
        modules: [path.resolve('../src'), 'node_modules'],
    }
})
