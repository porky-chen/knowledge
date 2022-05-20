'use strict'
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    // TODO:模式
    mode: "development",
    //基础构建
    // TODO:入口
    entry: {
        index:'./src/index.js',
        // Runtime code for hot module replacement
        hot: 'webpack/hot/dev-server.js',
        // Dev server client for web socket transport, hot and live reload logic
        client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true'
        // another: './src/another-module.js',
    },
    // entry: './src/index.js',
    // 使用多个入口时需设置optimization.runtimeChunk:'single'
    // 使用optimization.splitChunks
    // webpack优化功能,将runtime代码拆分成一个单独地chunk
    // TODO:优化 ,根据不同的mode执行不同的优化
    optimization: {
        runtimeChunk: 'single', // 创建一个在所有生成 chunk 之间共享的运行时文件
        moduleIds: 'deterministic', // 使用模块id时，使用哪种算法，防止vendor hash发送变化在内容变化的时候
        // splitChunks: {
        //     chunks: "all"
        // }
        splitChunks: { // 动态分块策略
            cacheGroups: {
                vendor:{
                    test: /[\\/]node_modules[\\/]/,// 分离node_modules
                    name: 'vendors',
                    chunks: "all"
                }
            }
        },
    },
    // TODO:输出
    output: {
        path: path.resolve(__dirname, 'dist'),
        //filename: "js/[name].[contenthash].js", // initial chunk [contenthash]实现hash热更替
        filename: "js/[name].js",
        chunkFilename: "js/[id].[contenthash].js", // non-initial chunk
        clean: true,  // 每次构建前清理旧数据
        //library: 'webpackDemo', // 暴露从入口导出的内容，只能通过被script标签引用，不可被用CommonJS、AMD、Node.js等环境中
        library: { // 此时就可打包成一个库，可提供CommonJS、AMD或script标签使用
            name:'webpackDemo',
            type: "umd"
        },
        publicPath: '/'
    },
    // 外部化
    externals: {
        lodash: { // lodash 这个依赖在 consumer（使用者） 环境中必须存在且可用
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    },
    // 想实现从一个依赖中调用多个文件如import A from 'library/one; import B from 'library/two'
    // externals: [
    //     'library/one',
    //     'library/two',
    //     // 匹配 "library/" 开始的所有依赖
    //     /^library\/.+$/,
    // ],
    // 从什么位置开始查找文件
    // TODO：快速开发应用程序
    devServer: {
        static: './dist', // 允许配置从目录提供静态文件的选项（默认是 'public' 文件夹）
        // Dev server client for web socket transport, hot and live reload logic
        hot: false,
        // client:false,
        client:{
            logging: 'none', //允许在浏览器中设置日志级别 'log' | 'info' | 'warn' | 'error' | 'none' | 'verbose'
            overlay:true, // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
            progress: true, // 在浏览器中以百分比显示编译进度。
            reconnect: true, // 告诉 dev-server 它应该尝试重新连接客户端的次数。当为 true 时，它将无限次尝试重新连接。
            webSocketTransport: 'ws', // 'ws' | 'sockjs'  传输模式  这允许指定浏览器或其他客户端与 devServer 的通信方式
            //webSocketURL: 'url', //允许指定 URL 到 web socket 服务器
            // webSocketURL: {
            //     hostname: '0.0.0.0',
            //     pathname: '/ws',
            //     password: 'dev-server',
            //     port: 8080,
            //     protocol: 'ws',
            //     username: 'webpack',
            // },
        },
        // server: 'http' , 允许设置服务器和配置项 'http' | 'https' | 'spdy' string object 对象可以配置签名证书
        // proxy: { // 代理URL，使得和后端在同一域上发起请求，解决跨域
        //     '/api':{
        //         context: ['/auth','/api'], 希望多个特定路径代理到同一目标
        //         target:'http://localhost:8080', 目标路径
        //         changeOrigin:true, 代理时会保留主机头的来源 设置为 true 以覆盖此行为
        //         secure: false, 默认情况下，将不接受在 HTTPS 上运行且证书无效的后端服务器
        //         pathRewrite:{ '^/api':'' }  不希望传递/api重写路径
        //     }
        // },
        //host:'0.0.0.0', // 指定使用的host，可以被外部访问 'local-ip' | 'local-ipv4' | 'local-ipv6'
        // webSocketTransport: 'ws', // 'ws' | 'sockjs' string
        // port: 9900, // 设置端口
        // compress: true // 启用gzip
        // devMiddleware: { // 为 webpack-dev-middleware 提供处理 webpack 资源的配置项。
        //     index: true,
        //     mimeTypes: { phtml: 'text/html' },
        //     publicPath: '/',
        //     serverSideRender: true,
        //     writeToDisk: true,
        // },
        // 允许访问的开发服务器白名单
        // allowedHosts:[
        //     'host.com',
        //     'subdomain.com'
        // ]
        // allowedHosts: ['.host.com', 'host2.com'],
        // http2: true,// HTTP/2自带签名证书
        // https:true, // 默认情况下是http提供服务，也可以选择https
        // https: { // 需提供签名证书，但是可以提供自己的证书
        //     ca: './path/to/server.pem',
        //     pfx: './path/to/server.pfx',
        //     key: './path/to/server.key',
        //     cert: './path/to/server.crt',
        //     passphrase: 'webpack-dev-server',
        //     requestCert: true,
        // },

    },
    devtool: "inline-source-map",  // 仅用于示例，不要用于生成环境,控制台可以看到 错误 来自哪个 资源文件
    // 资源管理
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     // loader中使用include有助于减少非必要模块的loader，仅引用在实际需要转换的模块
            //     include: [path.resolve('src')]
            // },
            {
              test:/\.ts/,
              use:'ts-loader'
            },
            {
                test: /\.css$/,
                use:['style-loader','css-loader']   // 链会逆序执行先css-loader然后style-loader
            },
            {
                test: /\.(png|svg|jpe?g|gif)(\?.*)?$/,
                type:  'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type:  'asset/resource'
            },
        ]
    },
    //TODO:缓存生成的webpack模块和chunk，来改善构建速度
    //cache: true 与 cache: { type: 'memory' } 开发环境使用，生产环境禁用
    cache: false,
    // TODO:插件管理
    plugins: [
        new HtmlWebpackPlugin({
            title:'hot modules replacement',
            // filename: 'index.html',
            // template: 'index.html',
            // inject: true
        }),
        // plugin for hot module replacement
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            _: 'lodash',
        })
    ]
}
/*
* webpack 重点功能
* TODO:代码分离 : 分割成多个小的bundle.js
* 1、入口起点(entry point)：使用entry配置手动地分离代码
* · 隐患：如果存在重复chunk会分别引入到各自地bundle中、该方法不够灵活不能动态将核心逻辑代码拆分出来
* · 应尽可能避免使用多入口的入口:entry:{ page:['./analytics','./app'] }
* 2、防止重复(prevent duplication)：使用Entry dependencies 或者 SplitChunkPlugin 去重和分离chunk
* · dependOn 可以在chunk之前共享模块;
* · SplitChunkPlugin
* 3、动态导入(dynamic import)：通过模块地内联函数调用来分离代码
* TODO: 缓存 : 命中缓存，以降低网络流量，使网站加载速度更快
* 保证 webpack 编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件
* 1、输出文件地文件名(output filename)
* · substitution(可替代模板字符串) [contenthash]
* · optimization的runtimeChunk和splitChunks.cacheGroups.vendor
* TODO: 模板标识符（module identifier）
* TODO: 构建性能
* 1、通用环境
* · 引导(bootstrap) - 额外的loader/plugin都有其启动时间。尽量少的使用工具
* · 提高解析速度 - 减少resolve :{ modules,extensions,mainFiles,descriptionFiles }中条目数量，因为它们会增加文件系统调用的次数
* · 同上 - 如果不使用symlinks(如 npm link / yarn link),可以设置resolve.symlinks: false
* · 同上 - 如果使用自定义resolve plugin 规则,并且没有指定context上下文,可以设置resolve.cacheWithContext: false
* · 使用DllPlugin为更改不频繁的代码生成单独的编译结果。可以提高应用程序的编译速度,尽管会增加构建过程的复杂度
* · 减少编译结果的整体大小,以提高构建性能,尽量保持chunk体积小
* · · 使用数量更少/体积更小的library
* · · 在多页面应用程序中使用SplitChunkPlugin
* · · 在多页面应用程序中使用SplitChunkPlugin,并开启async模式
* · · 移除未引用的代码
* · · 只编译你当前正在开发的那些代码
* · worker池(worker pool) thread-loader可以将非常消耗资源的loader分流给一个worker pool
* · 持久化缓存
* · · 在webpack中配置cache选项，使用package.json中的"postinstall"清除缓存目录
* · 自定义plugin/loader
* 2、开发环境
* · 增加编译
* · · 某些配置环境在使用watch mode 会回退到poll mode(轮询模式),监听许多文件会导致CPU大量负载。在这些情况下,可以使用watchOptions.poll来增加轮询的间隔时间
* · · 在使用内置watch mode(监听模式)会记录时间戳并将此信息传递给compilation以使缓存失效
* · 在内存中编译
* · · webpack-dev-server、webpack-hot-middleware、webpack-dev-middleware可以在内存中编译来提高性能
* · stats.toJson加速
* · Devtool
* · · 不同的devtool设置，会导致性能差异
* · · "eval"具有最好的性能，但不能帮助转译代码
* · · 如果可以接受稍微差一点的map质量,可以使用cheap-source-map变体配置来提高性能
* · · 使用eval-source-map变体配置进行增量编译
* · · 大多情况下,最佳选择是cheap-eval-source-map
* · 避免在生成环境下才会用到的工具
* · · TerserPlugin、[fullhasd]/[chunkhasd]/[contenthash]、AggressiveSplittingPlugin、AggressiveMergingPlugin、ModuleConcatenationPlugin
* · · 在开发环境排除以上工具
* · 最小化entry chunk
* · · 确保在生成entry chunk时，尽量减少其体积以提高性能。
* · · optimization:{ runtimeChunk: true } 该配置为运行时创建一个额外的chunk,所以它的生成代价比较低
* · 避免额外的优化步骤
* · · 通过执行额外的算法任务,来优化输出结果的体积和加载性能
* · · optimization:{ removeAvailableModules: false, removeEmptyChunks: false, splitChunks: false }
* · 输出结果不携带路径信息
* · · output.pathinfo: false关闭输出的额bundle带路径信息，会导致造成垃圾回收性能压力
* · Node.js版本8.9.10-9.11.1
* · TypeScript loader
* 3、生产环境
* · Source maps 非常消耗资源，根据需要使用
* 4、工具相关问题 - 下列工具存在某些可能降低构建性能问题
* · Babel - 最小化项目中的preset/plugin数量
* · TypeScript
* · · 在单独的进程中使用fork-ts-checker-webpack-plugin进行类型检查
* · · 配置loader跳过类型检查
* · · 使用ts-loader时，设置happyPackMode: true / transpileOnly: true
* · sass
* · · node-sass有个来自node.js线程池的阻塞线程的bug，当使用thread-loader时,需设置workerParallelJobs:2
* TODO：Tree Shaking
* · 将文本标记为side-effect-free(无副作用)
* · ·通过package.json的"sideEffects"设置为false，告知webpack可以安全的删除为用到的expoer，如果所有代码都不包含副作用
* · ·如果代码有一定副作用，"sideEffects": ["./src/some-side-effectful-file.js","*.css"] 所有导入文件都会收到tree shaking的影响
* · 将函数调用标记为无副作用
* · ·通过函数前加PURE注释语句
* TODO：生产环境
* · 压缩(Minification)
* · ·production环境默认使用TerserPlugin检测并压缩代码,ClosureWebpackPlugin压缩插件,需确保和tree shake具有删除未引用代码能力
* · 源码映射（Source mapping）
* · ·production中使用source map，有助于debug和运行benchmark tests(基准测试)
* · 压缩CSS
* TODO：懒加载
* · 加快了初始加载速度，减轻了总体体积，因为有些代码块可能不会被加载
* TODO：ECMAScript模块
* · 导出
* · ·export,允许将esm中的内容暴露给其他模块
* · 导入
* · ·import 允许从其他模块获取引用到esm中
* · 将模块标记为ESM
* · ·package.json中设置"type":"module"会强制package.json下所有文件使用ECMAScript模块，设置"type":"commonjs" 会强制使用CommonJS模块
* · ·可以通过.mjs和.cjs扩展名来设置模块，.mjs强制使用ESM，.cjs强制使用CommonJS
* · ·在使用 text/javascript 或 application/javascript mime type 的 DataURI 中，也将使用 ESM
* · ·no ESM仅能导入default导出的模块，不支持命名导出的模块
* · ·CommonJS语法不可用：require,module,exports,__filename,__dirname
* · ·
* · ·
* · ·
* */
/*#__PURE__*/ //fn()  // 通过前面PURE注释标记无副作用函数
