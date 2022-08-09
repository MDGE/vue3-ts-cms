/*
 * @Author: 崔浩然
 * @Email：cuihaoran@hualala.com
 * @Date: 2022-08-08 21:10:20
 * @Description: 基于axios的HTTP请求模块的出口
 * @FilePath: /vue3-ts-cms/src/service/index.ts
 */
import HRRequest from './request'

export const hrRequest = new HRRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: Number(process.env.VUE_APP_TIMEOUT),
  interceptors: {
    requestInterceptor: (config) => {
      const token = localStorage.getItem('token')
      if (token && config.headers) {
        config.headers.Authorization = 'Bearer ' + token
      }
      console.log('单个实例请求成功的拦截：', config)
      return config
    },
    requestInterceptorCatch: (error) => {
      console.log('单个实例请求失败的拦截：', error)
      return Promise.reject(error)
    },
    responseInterceptor: (response) => {
      console.log('单个实例响应成功的拦截：', response)
      return response
    },
    responseInterceptorCatch: (error) => {
      console.log('单个实例请求失败的拦截：', error)
      return Promise.reject(error)
    }
  }
})
