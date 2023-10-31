const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const compile_stage = require('./src/compile_stage/index.ts')


const mode = process.env.NODE_ENV || 'development';

module.exports = {
    mode,
    entry: {
        main: './src/index.ts',
        worker: './src/worker/worker.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.worker.ts$/,
                use: {loader: 'worker-loader', options: {inline: true}},
            },
            {
                test: /\.s[ca]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.hbs$/,
                use: 'handlebars-loader',
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/templates/index.hbs',
            filename: 'index.html',
            templateParameters: compile_stage.template_context
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
    ],
    resolve: {
        extensions: ['.js', '.ts'],
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
    },
};
