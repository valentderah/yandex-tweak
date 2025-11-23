const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const miniExtractPlugin = require('mini-css-extract-plugin')

const config = {
    entry: {
        background: './src/content/index.js',
        render: './src/popup/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/popup/index.html',
            filename: 'index.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public',
                    globOptions: {
                        ignore: [
                            '**/banner.png',
                            '**/poster-en.png',
                            '**/poster-ru.png',
                            '**/screenshot.png'
                        ]
                    }
                },
                {
                    from: 'src/shared/fonts',
                    to: 'fonts'
                }
            ]
        }),
        new miniExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    miniExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },

    mode: "production",

    optimization: {
        minimize: true
    }
}


module.exports = (env, argv) => {

    if (argv.mode === "development") {
        config["optimization"]["minimize"] = false
    }

    return config
}
