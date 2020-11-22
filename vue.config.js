const defaultSettings = require('./src/settings.js')

// resolve定义一个绝对路径获取函数
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'Vue Element Demo' // page title

const port = process.env.port || process.env.npm_config_port || 1991 // dev port

module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development', // eslint-loader 是否在保存的时候检查
  devServer: {
    port: port, // 端口
    open: true, // 自动打开浏览器
    https: false, // 启用https
    overlay: {
      warnings: false,
      errors: true
    }, // 错误、警告在页面弹出
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    after: require('./mock/mock-server.js')
  },
  // webpack配置
  configureWebpack: {
    name: name, // 设置webpack的name配置项
    resolve: {
      alias: {// 别名配置
        '@': resolve('src')
      }
    },
    // 高德地图配置
    externals: {
      'AMap': 'AMap'
    }
  },
  chainWebpack (config) {
    // vue inspect --rules
    // set svg-sprite-loader
    // 配置svg规则排除icons目录中svg文件处理
    // 目标给svg规则增加一个排除选项exclude:['path/to/icon']
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    // 新增icons规则，设置svg-sprite-loader处理icons目录中的svg
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // 注意一定要在HtmlWebpackPlugin之后引用
              // inline 的name 和你 runtimeChunk 的 name保持一致
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // 只打包初始时依赖的第三方
                },
                elementUI: {
                  name: 'chunk-elementUI', // 单独将 elementUI 拆包
                  priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 为了适应cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // 可自定义拓展你的规则
                  minChunks: 3, // 最小共用次数
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
