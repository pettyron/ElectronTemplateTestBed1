/* eslint-disable */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const path = require("path");
const package = require("./package.json");
const webpack = require("webpack");

const isDevMode = process.env.NODE_ENV !== "production";
const tsLoaders = [];

if (isDevMode) {
    tsLoaders.push({ loader: "react-hot-loader/webpack" });
}
tsLoaders.push({ loader: "ts-loader", options: { transpileOnly: true } });

module.exports = [
    {
        mode: "development",
        entry: "./src/renderer/index.tsx",
        target: ["electron-renderer"],
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
                    use: tsLoaders
                },
                {
                    test: /\.node$/,
                    loader: "native-ext-loader"
                }
            ]
        },
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "build/renderer"),
            publicPath: "./"
        },
        plugins: [
            new HtmlWebpackPlugin({ title: package.build.productName }),
            new ForkTsCheckerWebpackPlugin(),
            // new webpack.DefinePlugin({
            //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            //     'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
            // })
            // new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            contentBase: "./build/renderer",
            hot: true,
            port: 4000,
            // publicPath: "/"
        }
    }
]
