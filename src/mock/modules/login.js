// 登录相关接口模拟

// 登录接口
export function login () {
  return {
    // isOpen: false,
    url: 'http://127.0.0.1:8080/login',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 1000,
      'success': true,
      'data': {
        'token': '4344323121398'
        // 其他数据
      }
    }
  }
}
