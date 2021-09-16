const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    mode: `production`,

    output: {
        clean: true,
        filename: "main.[contenthash].js"
    },

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: `html-loader`,
                options: {
                    sources: false,
                    minimize: true,
                },
            },
            { // Este es para el componentes .css
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // filename: `./index.html`, // Para cambiar el nombre de salida de un archivo
        }),

        new MiniCssExtractPlugin({
            filename: "[name].[fullhash].css", // [name] le dice que use el mismo nombre
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets/", to: "assets/" },
            ],
        }),
    ]
}