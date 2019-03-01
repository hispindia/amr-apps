const HtmlWebpackPlugin = require('html-webpack-plugin')

// Base configuration used in both production and during development.
module.exports = {
    entry: {
        app: ['@babel/polyfill', './src/index.js'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ["@babel/plugin-proposal-class-properties"],
                        presets: ["@babel/preset-env", "@babel/react"],
                        env: {
                            production: {
                                presets: ["react-optimize"]
                            }
                        }
                    }
                },
                exclude: /node_modules/,
            },
            {
                test: /\.webapp$/,
                loader: 'json-loader',
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: [
                    /\.bmp$/,
                    /\.gif$/,
                    /\.jpe?g$/,
                    /\.png$/,
                    /\.(png|woff|woff2|eot|ttf|svg)$/,
                ],
                loader: require.resolve('file-loader'),
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'AMR Record Capture',
            filename: 'index.html',
            template: 'public/index.html',
            favicon: 'public/favicon.ico',
        }),
    ],
}
