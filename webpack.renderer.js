/* eslint-disable */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = [
    {
        mode: "development",
        entry: "./src/renderer/index.tsx",
        target: "electron-renderer",
        devtool: "source-map",
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            mainFields: ["main", "module", "browser"],
            modules: [path.join(__dirname, "./node_modules")],
            alias: { "react-dom": "@hot-loader/react-dom" }
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: "/node_modules/",
                    use: [
                        {
                            loader: "babel-loader"
                        }
                    ]
                }
            ]
        },
        output: {
            path: __dirname + "/build",
            filename: "bundle.js"
        },
        plugins: [
            // new HtmlWebpackPlugin({
            //     // template: "./src/index.html",
            //     // filename: "index.html",
            //     // inject: "body",
            // }),
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            contentBase: path.join(__dirname, "/build"),
            hot: true,
            port: 4000
        }
    }
]
