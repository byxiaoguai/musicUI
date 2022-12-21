import axios from 'axios'

let httpService = axios.create({
  // baseURL: 'http://127.0.0.1:7878/api',
   baseURL: 'https://music.dog886.com/api',
   // baseURL: 'https://y.x6x3.com/api',
  timeout: 5000
})

// 拦截请求
httpService.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token')
  }
  return config;
},err => {
  Promise.reject(err);
})

// 拦截响应
httpService.interceptors.response.use(response => {
  // console.log(response)
  // console.log('请求成功')
  return response;
},err => {
  return Promise.reject(err);
})

// get请求的封装
export function get(url, params={}, headers = {'Content-Type':'application/json'}) {
  return new Promise((resolve,reject) => {
    httpService({
      url: url,
      method: 'get',
      params: params,
      headers: headers,
    }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

// post请求封装 
export function post(url, data = {}, headers = {'Content-Type':'application/json'}) {
  return new Promise((resolve,reject) => {
    httpService({
      url: url,
      method:'post',
      data: JSON.stringify(data),
      headers: headers
    }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

export default {
  get,
  post,
}

