/*
 * @Author: 崔浩然
 * @Email：cuihaoran@hualala.com
 * @Date: 2022-08-08 09:35:45
 * @Description: vue.config.js的配置
 * @FilePath: /vue3-ts-cms/vue.config.js
 */
const { defineConfig } = require('@vue/cli-service')
// element-plus 按需引入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  // 1. 配置方式一：由CLI提供配置参数，会与webpack的配置的参数名不太一样。
  transpileDependencies: true,
  outputDir: 'build',
  // 2. 配置方式二：在configureWebpack中写webpack的配置，最终会与Vue-CLI的webpack的配置合并。
  configureWebpack: {
    output: {
      publicPath: '/'
    },
    resolve: {
      alias: {
        '@components': '@/components'
      }
    },
    experiments: {
      topLevelAwait: true
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
  // 配置方式三：chainWebpack
  // chainWebpack: config => {
  //   config.resolve.alias.set('@components', '@/components')
  // }
})
