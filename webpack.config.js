const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

var path = require('path');

module.exports = {
    mode: "development",

    entry: './main.ts',

    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: './',
        filename: 'main.js'
    },

    devtool: "source-map",

    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.vue', '.jsx', '.ts', '.tsx', '.css']
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { hmr: true }
                    },
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            template: 'main.html'
        })
    ],
    devServer: {
        hot: true,
        stats: 'minimal',
        overlay: true,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true
    }
};
