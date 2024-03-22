const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    // entry:{
    //     header: '/src/components/header/Header.js',
    //     footer: '/src/components/footer/Footer.js',
    //     button: '/src/components/button/Button.js'
    // },
    // entry: "./index.js",
    entry:{
        button: '/src/components/button/Button.js',
        buttonNew: '/src/components/buttonNew/ButtonNew.js',
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //         cacheGroups: {
    //             name: 'common',
    //             chunks: 'initial',
    //             minChunks: 1
    //         }
    //     }
    // },
    output: {
        path: path.resolve(__dirname, "dist"), // output folder
        filename: "[name]-bundle.js"
    },
    optimization: {
        splitChunks: {
          automaticNameDelimiter: '~',
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              chunks: 'all',
            },
          },
          chunks: 'all',
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          minChunks: 4,
          minSize: 30000,
          name: 'true',
        },
      },
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", { modules: false }], ["@babel/preset-react", { "runtime": "automatic" }]],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader", // for styles
                ],
            },
            {
                test: /\.(jpe?g|gif|png|svg|ico)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ],
                type: 'javascript/auto'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ['@babel/env','@babel/preset-react'] },
              },

        ],
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html")
    })],
};