/*
 * @Author: 崔浩然
 * @Email：cuihaoran@hualala.com
 * @Date: 2022-08-08 09:35:45
 * @Description: 页面/组件/功能的描述
 * @FilePath: /vue3-ts-cms/src/main.ts
 */
import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

import { hrRequest } from './service'

const app = createApp(App)
app.use(router)
app.use(store)
// 全局注册element-plus，建议使用按需引入，本项目使用的就是按需引入。
// app.use(ElementPlus)
app.mount('#app')

interface GoodList {
  code: number
  data: {
    list: unknown[]
    totalCount: number
  }
}

hrRequest
  .request<GoodList>({
    url: '/goods/list',
    method: 'POST',
    showLoading: true
  })
  .then((res) => {
    console.log(res.code)
    console.log(res.data)
    console.log(res.data.list)
    console.log(res.data.totalCount)
  })
