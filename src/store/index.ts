/*
 * @Author: 崔浩然
 * @Email：cuihaoran@hualala.com
 * @Date: 2022-08-08 15:10:09
 * @Description: vuex的集成
 * @FilePath: /vue3-ts-cms/src/store/index.ts
 */
import { createStore } from 'vuex'

const store = createStore({
  state: () => {
    return {
      author: 'renekton'
    }
  },
  mutations: {},
  actions: {},
  getters: {}
})

export default store
