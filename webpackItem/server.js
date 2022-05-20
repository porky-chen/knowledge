/*
* 通过中间件和express监听port 3300
* */
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackDebServer = require('webpack-dev-server') // 通过node.js API实现模块热更替
const path = require('path')

const app = express()
const config = require('./webpack.config')
const compiler = webpack(config)  // webpack.config.js作为webpack的基础配置

//---------hot modules replacement node.js API
const serverConfig = {
    mode: 'development',
    // Node.js API实现hot modules replacement
    entry:[
        // Runtime code for hot module replacement
        'webpack/hot/dev-server.js',
        // Dev server client for web socket transport, hot and live reload logic
        'webpack-dev-server/client/index.js?hot=true&live-reload=true',
        // Your entry
        './src/index.js'
    ],
    devtool: 'inline-source-map',
    plugins: [
        // Plugin for hot module replacement
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement',
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
}

const clientCompiler = webpack(serverConfig)

const server = new webpackDebServer({ hot: false,client: false },clientCompiler)

// (async () => {
//     await server.start()
//     console.log('dev server is running')
// })();

//--------

app.use( // express 使用 webpack-dev-middleware
    webpackDevMiddleware(compiler, {
        publicPath:config.output.publicPath,
    })
);

app.listen(3300,function (){
    console.log('app listening on port 3300')
})
