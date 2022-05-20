const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Progressive Web Application'
        }),
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true,
        }),
        // new webpack.ProvidePlugin({
        //     // _: 'lodash',
        //     join: ['lodash','join']
        // })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname,'dist'),
        clean:true,
    },
    module: {
        // rules: [
        //     {
        //         // imports-loader覆盖this的指向,原本模块在CommonJS上下文中，this指向的是module.exports，下面把this指向覆盖指回window
        //         test: require.resolve('./src/index.js'),
        //         use: 'imports-loader?wrapper=window'
        //     },
        //     {
        //         // 为了将file导出为file,helper.parse导出为parse
        //         test: require.resolve('./src/global.js'),
        //         use:
        //           'exports-loader?type=commonjs&exports=file,multiple/helpers.parse/parse'
        //         // 可以使用const { file, parse } = require('./global.js')
        //     }
        // ]
    }
}
