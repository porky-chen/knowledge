const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
   mode: 'production',
   devtool: 'source-map',
});
//避免在该环境使用inline-**/eval-**,因为他们会增大bundle的体积大小，会降低整体性能
