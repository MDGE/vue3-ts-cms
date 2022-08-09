/*
 * @Author: 崔浩然
 * @Email：cuihaoran@hualala.com
 * @Date: 2022-08-08 17:32:50
 * @Description: axios的使用案例
 * @FilePath: /vue3-ts-cms/src/service/axiosDemo.ts
 */
import axios from 'axios'

console.log(process.env.NODE_ENV)
console.log(process.env.VUE_APP_FLAG)
console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_TIMEOUT)

axios.defaults.baseURL = 'http://152.136.185.210:5000'

let token = localStorage.getItem('token') ?? ''

if (!token) {
  // axios实例
  const res = await axios.request({
    url: '/login',
    method: 'post',
    data: {
      name: 'coderwhy',
      password: '123456'
    }
  })

  token = res.data.data.token ?? ''

  localStorage.setItem('token', token)
} else {
  const res = await axios.request({
    url: '/test',
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  console.log(res)
}
