var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: 'node',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        proxy: { "/api/**": { target: 'http://localhost:9000', secure: false } },
        publicPath: "/",
        port: process.env.PORT,
        historyApiFallback: {
            // disableDotRule: true,
            rewrites: [
                { from: /^\/$/, to: '/public/index.html' },
            ],
        }
    },
    plugins: [
        
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            hash: true,
            title: 'Finexus',
            favicon: 'public/favicon.ico',
            manifest:'public/manifest.json'
        }),

    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/react'],
                        plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },

            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.png$/, use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.jpg$/, use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }]
            },
        ]
    },
};