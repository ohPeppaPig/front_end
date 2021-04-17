const TransformModulesPlugin = require('webpack-transform-modules-plugin')

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    // 启动时打开浏览器
    open: true,
    host: 'localhost',
    // 打开浏览器时的路径
    openPage: '',
    // 服务端口
    port: 8082,
    // 设置代理
    proxy: null
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': '@/assets',
        '@components': '@/components',
        '@views': '@/views',
        '@services': '@/services',
        '@core': '@/core',
        '@routers': '@/routers',
        '@util': '@/util',
        'cube-ui': 'cube-ui/lib'
      }
    },
    plugins: [new TransformModulesPlugin()],
    performance: {
      hints: false // 关闭 webpack 的性能提示
    }
  },

  productionSourceMap: true, // 生产环境允许生成sourcemap文件方便问题定位，上传成功后会删除map文件确保不被打包到生产环境

  chainWebpack: config => {
    config.devtool = 'source-map'
    config.output.filename('[name].[hash].js').end()
  }
}
