// import path from "path";
/* eslint-disable */
const path = require("path");

module.exports = (_, args) => {
    const mode = args.mode || "development";
    const isDevMode = mode === "development";

    return {
        target: "electron-main",
        mode,
        entry: "./src/main/main.ts",
        optimization: {
            minimize: !isDevMode
        },
        output: {
            filename: "main.js",
            path: path.resolve(__dirname, "build/main")
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            mainFields: ["main", "module", "browser"],
            modules: [path.join(__dirname, "./node_modules")]
        },
        devtool: "inline-source-map",
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/i,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                                "@babel/preset-typescript",
                            ],
                        },
                    },
                }
            ]
        },
        node: { __dirname: false }
    }
};