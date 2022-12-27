// 二次封装axios
import axios from 'axios'
import config from './config'
// qs是一个流行的查询参数序列化和解析库。可以将一个普通的object序列化成一个查询字符串，或者反过来将一个查询字符串解析成一个object,帮助我们查询字符串解析和序列化字符串。
import qs from 'qs'
import Cookies from 'js-cookie'
import router from '@/router'

// 使用vuex做全局loading时使用
// import store from '@/store'

export default function $axios (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: {},
      // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
      transformResponse: [function (data) {
        // console.log('transformResponse', data)
      }]
    })

    // 添加 request 拦截器(在请求或响应被 then 或 catch 处理前拦截它们)
    instance.interceptors.request.use(config => {
      // 在发送请求之前做些什么
      let token = Cookies.get('token')
      // 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
      // console.log(store.state.loading)
      // console.log('准备发送请求...')
      // 2. 带上token
      if (token) {
        config.headers.accessToken = token
      } else {
        // 重定向到登录页面
        router.push('/login')
      }
      // 3. 根据请求方法，序列化传来的参数，根据后端需求是否序列化
      if (config.method === 'post') {
        console.log(config.data)
        // __proto__ 属性在 ECMAScript 3.1 中已经被弃用，并且不应该在代码中使用。使用 Object.getPrototypeOf 和 Object.setPrototypeOf 代替。
        // config.data.__proto__ === FormData.prototype ||
        if (config.url.endsWith('path') || config.url.endsWith('mark') || config.url.endsWith('patchs')) {
          console.log(config)
        } else {
          config.data = qs.stringify(config.data)
        }
      }
      return config
    },

      // 对请求错误做些什么
    error => {
      // 请求错误时
      console.log('request:', error)
      // 1. 判断请求超时
      if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        console.log('timeout请求超时')
        // return service.request(originalRequest);// 再重复请求一次
      }
      // 2. 需要重定向到错误页面
      const errorInfo = error.response
      console.log(errorInfo)
      if (errorInfo) {
        error = errorInfo.data // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
        const errorStatus = errorInfo.status // 404 403 500 ...
        router.push({
          path: `/error/${errorStatus}`
        })
      }
      return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
    }
    )

    // 添加 response 拦截器
    instance.interceptors.response.use(response => {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      let data
      // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
      if (response.data === undefined) {
        data = JSON.parse(response.request.responseText)
      } else {
        data = response.data
      }

      // 根据返回的code值来做不同的处理
      switch (data.rc) {
        case 1:
          console.log(data.desc)
          break
        case 0:
          // store.commit('changeState')
          console.log('登录成功')
          break
        default:
      }
      // 若不是正确的返回code，且已经登录，就抛出错误
      // const err = new Error(data.desc)
      // err.data = data
      // err.response = response
      // throw err

      return data
    },

    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    err => {
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = '请求错误'
            break
          case 401:
            err.message = '未授权，请登录'
            break
          case 403:
            err.message = '拒绝访问'
            break
          case 404:
            err.message = `请求地址出错: ${err.response.config.url}`
            break
          case 408:
            err.message = '请求超时'
            break
          case 500:
            err.message = '服务器内部错误'
            break
          case 501:
            err.message = '服务未实现'
            break
          case 502:
            err.message = '网关错误'
            break
          case 503:
            err.message = '服务不可用'
            break
          case 504:
            err.message = '网关超时'
            break
          case 505:
            err.message = 'HTTP版本不受支持'
            break
          default:
        }
      }
      console.error(err)
      return Promise.reject(err) // 返回接口返回的错误信息
    })

    // 请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}
