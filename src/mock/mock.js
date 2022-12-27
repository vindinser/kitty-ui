import Mock from 'mockjs'

// login
Mock.mock('http://127.0.0.1:8080/login', {
  data: {
    'token': '17852665544444',
    'userName': 'zs',
    'userPwd': '123456789',
    'others': ''
  }
})

Mock.mock('http://127.0.0.1:8080/user', {
  'name': '@name',
  'email': '@email',
  'age|1-10': 5
})

Mock.mock('http://127.0.0.1:8080/menu', {
  'id': '@increment',
  'name': '@name',
  'order|10-20': 12
})
