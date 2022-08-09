/*
 * @Author: 崔浩然
 * @Email：cuihaoran@hualala.com
 * @Date: 2022-08-08 21:10:30
 * @Description: 基于axios的HTTP请求模块
 * @FilePath: /vue3-ts-cms/src/service/request/index.ts
 */

import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { HRRequestConfig, HRRequestInterceptors } from './type'

import { ElLoading } from 'element-plus'

type ElLoadingServiceType = typeof ElLoading.service
type ElLoadingInstance = ReturnType<ElLoadingServiceType>

const DEFAULT_LOADING = false

class HRRequest {
  instance: AxiosInstance
  interceptors?: HRRequestInterceptors
  loadingInstance?: ElLoadingInstance
  showLoading: boolean

  constructor(config: HRRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 声明拦截器
    this.interceptors = config.interceptors
    // loading相关的信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 1. 从config中取出的拦截器是对应的单个实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2. 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局拦截器——请求成功的拦截', config)

        // 是否显示loading需要根据配置来决定
        if (this.showLoading) {
          this.loadingInstance = ElLoading.service({
            text: '正在请求数据',
            background: 'rgba(0, 0, 0, 0.5)',
            lock: true
          })
        }

        return config
      },
      (error) => {
        console.log('全局拦截器——请求失败的拦截', error)
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        console.log('全局拦截器——响应成功的拦截', response)

        // 将loading移除
        setTimeout(() => {
          this.loadingInstance?.close()
        }, 1000)

        const { data } = response
        if (data.code === 0) {
          return data
        } else {
          // 如果返回的code不是0，则抛出错误
          return Promise.reject(data)
        }
      },
      (error) => {
        console.log('全局拦截器——响应失败的拦截', error)

        // 将loading移除
        this.loadingInstance?.close()

        // 判断不同的HTTP状态码，进行不同的处理
        switch (error.response.status) {
          case 401:
            // 返回 401 清除token信息并跳转到登录页面
            break
        }
        return Promise.reject(error)
      }
    )
  }

  request<T>(config: HRRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求的拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === true) {
        this.showLoading = config.showLoading
      }

      return this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 重置showLoading的状态
          this.showLoading = DEFAULT_LOADING

          resolve(res)
        })
        .catch((error) => {
          // 重置showLoading的状态
          this.showLoading = DEFAULT_LOADING
          reject(error)
        })
    })
  }

  get<T>(config: HRRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HRRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T>(config: HRRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T>(config: HRRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default HRRequest
