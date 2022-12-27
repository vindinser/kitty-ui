<template>
<!--  <div>-->
<!--    <h2>Login</h2>-->
<!--    <el-button @click="login">登录</el-button>-->
<!--    <el-button @click="anotherLogin">login</el-button>-->
<!--  </div>-->
  <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button>
      <el-button type="primary" style="width:48%;" @click.native.prevent="login" :loading="loginLoading">登 录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import '@/mock/mock.js'
// import '@/mock'
import Cookies from 'js-cookie'
// import router from '@/router'
export default {
  name: 'Login',
  data () {
    return {
      loginLoading: false,
      loginForm: {
        account: 'admin', // 账号
        password: '123456' // 密码
      }, // 登录表单
      fieldRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ], // 账号验证规则
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ] // 密码验证规则
      }, // 登录验证规则
      checked: true // 是否记住密码
    }
  },
  methods: {
  //   login () {
  //     console.log('login')
  //     this.$api.login().then(res => {
  //       console.log(res)
  //       Cookies.set('token', res.data.token) // 放置token到Cookie
  //       router.push('/') // 登录成功，跳转到主页
  //     }).catch(err => {
  //       console.log(err)
  //     })
  //   },
  //   async anotherLogin () {
  //     const { data: res } = await this.$api.login()
  //     console.log(res)
  //   }
  // }
  //   login () {
  //     let userInfo = {account: this.loginForm.account, password: this.loginForm.password}
  //     this.$api.login(JSON.stringify(userInfo)).then((res) => {
  //       Cookies.set('token', res.data.token) // 放置token到Cookie
  //       sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
  //       this.$router.push('/') // 登录成功，跳转到主页
  //     }).catch(function (res) {
  //       alert(res)
  //     })
  //   },
    async login () {
      let param = {
        account: this.loginForm.account,
        password: this.loginForm.password
      }
      const res = await this.$api.login(JSON.stringify(param))
      if (res.success) {
        Cookies.set('token', res.data.token) // 放置token到Cookie
        sessionStorage.setItem('userInfo', param.account) // 保存用户到本地会话
        await this.$router.push('/') // 登录成功，跳转到主页
      } else {
        this.$message.error('登录失败：' + res.msg)
      }
    },
    reset () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>

.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .remember {
    margin: 0 0 35px 0;
  }
}
</style>
