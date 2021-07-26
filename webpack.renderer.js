/* eslint-disable */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const path = require("path");
const package = require("./package.json");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");
const ReactRefreshTypeScript = require("react-refresh-typescript");

const isDevMode = process.env.NODE_ENV !== "production";
const plugins = [];

if (isDevMode) {
    plugins.push(
        ...[
            new webpack.HotModuleReplacementPlugin(),
            new ReactRefreshWebpackPlugin(),
        ]
    );
}

plugins.push(
    ...[
        new HtmlWebpackPlugin({
            title: package.build.productName,
            filename: "index.html",
            template: "./src/index.template.html",
            inject: true,
        }),
        new ForkTsCheckerWebpackPlugin(),
    ]
);

module.exports = [
    {
        mode: "development",
        entry: ["./src/renderer/index.tsx"],
        target: "web",
        devtool: "source-map",
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: "/node_modules/",
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                getCustomTransformers: () => ({
                                    before: isDevMode
                                        ? [ReactRefreshTypeScript()]
                                        : [],
                                }),
                                transpileOnly: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.node$/,
                    loader: "native-ext-loader",
                },
            ],
        },
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "build/renderer"),
        },
        plugins: plugins.filter(Boolean),
        devServer: {
            contentBase: "./build/renderer",
            hot: true,
            port: 4000,
        },
    },
];
