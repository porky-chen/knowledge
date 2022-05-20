const { merge } = require('webpack-merge')
const common = require('./webpack.common')

// merge(合并)功能方便引用common配置，
module.exports = merge(common,{
    mode: 'development',
    devtool: 'inline-source-map', // 强大的source map
    devServer: {
        static: './dist'
    },
});
