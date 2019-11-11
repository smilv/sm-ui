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

console.log(cModuleMap);

module.exports = {
    mode: "development",
    entry: { index: path.resolve(__dirname, "../index.js"), ...cModuleMap },
    output: {
        path: path.resolve(__dirname, "../lib"),
        filename: "[name]/index.js",
        library: "sm-ui",
        libraryTarget: "umd",
        publicPath: "/"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"],
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
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name]/style/index.css"
        })
    ]
};
