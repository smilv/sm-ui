const fs = require("fs");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const rootDir = path.resolve(__dirname, "../");
const packagesDir = "packages";
const cModuleNames = fs.readdirSync(path.resolve(packagesDir));

const cModuleMap = cModuleNames.reduce((prev, name) => {
    prev[name] = path.join(rootDir, `${packagesDir}/${name}/index.jsx`);
    return prev;
}, {});

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "../packages/index.js"),
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "sm-ui.js",
        library: "sm-ui",
        libraryTarget: "umd",
        publicPath: "/"
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            "@": path.resolve(__dirname, "../packages")
        }
    },
    externals: {
        react: {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react"
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom"
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[folder]__[local]"
                        }
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "sm-ui.css"
        })
    ]
};
