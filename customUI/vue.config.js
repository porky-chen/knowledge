const path = require('path')
const isDevelopment = process.env.NODE_ENV !== 'development'

module.exports = {
  devServer: {
    host: isDevelopment ? null : '127.0.0.1',
    // host: '127.0.0.1',
    port: 9099,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
  },
  pages: {
    index: {
      // demo 的入口
      entry: isDevelopment ? 'localDevelopmentTest/main.js' : 'demo/main.js',
      // entry: 'demo/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'SunrtUI 设计规范、展示以及例子',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },
  runtimeCompiler: true,
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('mdLoader')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('./demo/build/md-loader/index.js')
      .loader('./demo/build/md-loader/index.js')
      .end()

    config.module
      .rule('thejs')
      .test(/\.js$/)
      .include
      .add(path.resolve('src'))
      .add(path.resolve('node_modules/element-ui/packages'))
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .end()
  },
}
