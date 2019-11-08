var path = require("path");

module.exports = {
    entry: "./packages/index.js",
    output: {
        path: path.resolve(__dirname, "lib"),
        filename: "sm-ui.js",
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
        react: "React"
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
