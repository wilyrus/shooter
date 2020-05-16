const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var path = require('path');

module.exports = merge(common, {
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist',
        filename: 'main.js'
    },

    mode: 'development',

    devServer: {
        hot: true,
        stats: 'minimal',
        overlay: true,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true
    }
});
