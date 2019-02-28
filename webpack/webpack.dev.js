const merge = require('webpack-merge')
const common = require('./webpack.common.js')

// Webpack configuration used during development (yarn start/npm run-script start)
module.exports = merge(common, {
    mode: 'development',
    output: {
        publicPath: '/',
    },
    devServer: {
        port: 9000,
        inline: true,
        contentBase: './src',
        clientLogLevel: 'none',
        historyApiFallback: true,
        disableHostCheck: true,
        host: '0.0.0.0',
    },
    devtool: 'eval-source-map',
})
