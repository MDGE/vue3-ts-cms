/*
 * @Author: 崔浩然
 * @Email：cuihaoran@hualala.com
 * @Date: 2022-08-08 22:02:59
 * @Description: 页面/组件/功能的描述
 * @FilePath: /vue3-ts-cms/src/service/request/type.ts
 */
import { AxiosRequestConfig, AxiosResponse } from 'axios'

interface HRRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (response: T) => T
  responseInterceptorCatch?: (error: any) => any
}

interface HRRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HRRequestInterceptors<T>
  showLoading?: boolean
}

export { HRRequestConfig, HRRequestInterceptors }
