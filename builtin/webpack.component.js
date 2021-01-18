const path = require("path");
const fs = require('fs');
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const packages = {};

fs.readdirSync(path.resolve(__dirname, 'components')).forEach(p => {
    packages[p] = path.resolve(__dirname, 'components', p, 'index.ts');
});

module.exports = (env = {}) => ({
    mode: env.prod ? "production" : "development",
    devtool: env.prod ? "source-map" : "cheap-module-eval-source-map",
    // entry: [
    //     require.resolve(`webpack-dev-server/client`),
    // ].concat(packages.forEach(p => path.resolve(p, 'index.ts'))).filter(Boolean),
    entry: packages,
    output: {
        path: path.resolve(__dirname, "./packages"),
        filename: "[name]/index.js",
        publicPath: "/"
    },
    resolve: {
        alias: {
            // this isn't technically needed, since the default `vue` entry for bundlers
            // is a simple `export * from '@vue/runtime-dom`. However having this
            // extra re-export somehow causes webpack to always invalidate the module
            // on the first HMR update and causes the page to reload.
            vue: "@vue/runtime-dom",
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        appendTsSuffixTo: [/.vue$/],
                    }
                }
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            },
            {
                test: /\.png$/,
                use: {
                    loader: "url-loader",
                    options: { limit: 8192 }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { hmr: !env.prod }
                    },
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ],
    devServer: {
        inline: true,
        hot: true,
        stats: "minimal",
        contentBase: __dirname,
        overlay: true,
        injectClient: false,
        disableHostCheck: true
    }
});