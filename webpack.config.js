const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const { DefinePlugin } = require("webpack")

module.exports = {
    mode: "development",
    entry: ["@babel/polyfill","./src/main.js"],
    devtool: "source-map",
    output: {
        publicPath: "/",
        filename: "js/game.[hash:6].js",
        chunkFilename: "js/[name].[hash:6].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2
                        }
                    },
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: "asset",
                generator: {
                    filename: "img/[name].[hash:6][ext]"
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                }
            },
            {
                test: /\.(mp3|ogg)$/,
                type: "asset/resource",
                generator: {
                    filename: "sound/[name].[hash:6][ext]"
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new DefinePlugin({
            BASE_URL: "'/'"
        }),
        new HtmlWebpackPlugin({
            title: "galaga",
            template: "./public/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:6].css",
            chunkFilename: "css/[name].[hash:6].css"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "public",
                    globOptions: {
                        ignore: [
                            "**/index.html",
                            "**/.DS_Store"
                        ]
                    }
                }
            ]
        })
    ],
    devServer: {
        hot: true
    }
}