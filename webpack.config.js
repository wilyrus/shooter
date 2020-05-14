const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: "development",

    entry: './main.ts',

    devtool: "source-map",

    resolve: {
        extensions: [".ts", '.js']
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
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    devServer: {
        inline: true,
        hot: true,
        stats: 'minimal',
        overlay: true
    }
};
