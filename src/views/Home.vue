<template>
  <div class="container">
    <!-- 导航菜单栏 -->
    <MenuBar />
    <!-- 头部区域 -->
    <HeadBar />
    <!-- 主内容区域 -->
    <Main />
  </div>
</template>

<script>
import HeadBar from './HeadBar'
import MenuBar from './MenuBar'
import Main from './Main'

export default {
  name: 'Home',
  components: {
    HeadBar,
    MenuBar,
    Main
  },
  data () {
    return {}
  },
  methods: {
    // async textAxios () {
    //   const res = axios.get('http://127.0.0.1:8080')
    //   console.log(res)
    // }
    // async mock1 () {
    //   const res = axios.get('http://127.0.0.1:8080/user')
    //   console.log(res)
    // },
    // async mock2 () {
    //   const res = axios.get('http://127.0.0.1:8080/menu')
    //   console.log(res)
    // }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background: rgba(224, 234, 235, 0.1);
  }
</style>
