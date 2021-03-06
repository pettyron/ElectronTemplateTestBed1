/* eslint-disable */
const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = (_, args) => {
    const mode = args.mode || "development";
    const isDevMode = mode === "development";

    return {
        target: "electron-main",
        mode,
        entry: ["./src/main/main.ts"],
        optimization: {
            minimize: !isDevMode,
        },
        output: {
            filename: "main.js",
            path: path.resolve(__dirname, "build/main"),
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        devtool: "inline-source-map",
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/i,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "ts-loader",
                            options: { transpileOnly: true },
                        },
                    ],
                },
            ],
        },
        plugins: [new ForkTsCheckerWebpackPlugin()],
        node: { __dirname: false },
    };
};
