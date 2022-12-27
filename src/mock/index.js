// 模拟接口文件聚合模块
import Mock from 'mockjs'
// 把所有的输出包裹到xx对象里
import * as login from './modules/login'
import * as user from './modules/user'
import * as menu from './modules/menu'

// 1. 开启/关闭[业务模块]拦截, 通过调用fnCreate方法[isOpen参数]设置.
// 2. 开启/关闭[业务模块中某个请求]拦截, 通过函数返回对象中的[isOpen属性]设置.
fnCreate(login, true)
fnCreate(user, true)
fnCreate(menu, true)

// fnText(1, 2) // result 1,2
// fnText(1) // result 1,3
//
// function fnText (a, b = 3) {
//   console.log(a, b)
// }

/**
 * 创建mock模拟数据
 * @param {*} mod 模块
 * @param {*} isOpen 是否开启?
 */
function fnCreate (mod, isOpen = true) {
  if (isOpen) {
    for (let key in mod) {
      ((res) => {
        if (res.isOpen !== false) {
          // console.log(new RegExp(res.url)) 转正则
          // mock（rurl, rtype, template）记录数据模板。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回。
          Mock.mock(new RegExp(res.url), res.type, (opts) => {
            opts['data'] = opts.body ? JSON.parse(opts.body) : null
            delete opts.body
            console.log('\n')
            console.log('%cmock拦截, 请求: ', 'color:blue', opts)
            console.log('%cmock拦截, 响应: ', 'color:blue', res.data)
            return res.data
          })
        }
      })(mod[key]() || {})
    }
  }
}
