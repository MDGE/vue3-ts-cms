/*
 * @Author: 崔浩然
 * @Email：cuihaoran@hualala.com
 * @Date: 2022-08-08 19:46:32
 * @Description: 区分不同的环境变量
 * @FilePath: /vue3-ts-cms/src/service/request/config.ts
 */
let BASE_URL = ''
let BASE_NAME = ''

if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://localhost:3000/prod'
  BASE_NAME = 'renekton'
} else if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3000/dev'
  BASE_NAME = 'renekton'
} else {
  BASE_URL = 'http://localhost:3000/test'
  BASE_NAME = 'renekton'
}

export { BASE_URL, BASE_NAME }
