<!-- 头部导航栏 -->
<template>
  <div class="container">
    <!-- 导航菜单隐藏显示切换 -->
    <span class="collapse-switcher" @click.prevent="collapse">
      <i class="el-icon-menu"></i>
    </span>
    <!-- 导航菜单 -->
    <span class="nav-bar">
      <el-menu :default-active="activeIndex" class="el-menu-demo" text-color="#fff" active-text-color="#ffd04b" mode="horizontal" @select="selectNavBar()">
        <el-menu-item index="1" @click="$router.push('/')">{{ $t("common.home") }}</el-menu-item>
        <el-menu-item index="2">{{ $t("common.doc") }}</el-menu-item>
        <el-menu-item index="3">{{ $t("common.msgCenter") }}</el-menu-item>
      </el-menu>
    </span>
    <span class="tool-bar">
      <!-- 主题切换 -->
      <ThemePicker class="theme-picker"></ThemePicker>
      <!-- 语言切换 -->
      <LangSelector class="lang-selector"></LangSelector>
      <!-- 用户信息 -->
      <el-dropdown class="user-info-dropdown" trigger="hover">
        <span class="el-dropdown-link"><img :src="this.userAvatar" alt="" /> {{username}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{$t("common.myMsg")}}</el-dropdown-item>
          <el-dropdown-item>{{$t("common.config")}}</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">{{$t("common.logout")}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
  </div>
</template>

<script>
// import mock from '@/mock/index.js'
import '@/mock/index.js'
import ThemePicker from '@/components/ThemePicker'
import LangSelector from '@/components/LangSelector'

export default {
  name: 'HeadBar',
  components: {
    ThemePicker,
    LangSelector
  },
  data () {
    return {
      isCollapse: false,
      username: 'Louis',
      userAvatar: '',
      activeIndex: '1'
    }
  },
  mounted () {
    this.sysName = 'I like Kitty'
    let user = sessionStorage.getItem('userInfo')
    if (user) {
      this.userName = user
      this.userAvatar = require('@/assets/user.png')
    }
  },
  methods: {
    selectNavBar (key, keyPath) {
      console.log(key, keyPath)
    },
    // 折叠导航栏
    collapse: function () {
      this.isCollapse = !this.isCollapse
    },
    // 退出登录
    logout: function () {
      // var _this = this
      this.$confirm('确认退出吗?', '提示', {
        type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  left: 200px;
  right: 0;
  height: 60px;
  line-height: 60px;
  background: #4B5F6E;

  .collapse-switcher {
    width: 40px;
    float: left;
    cursor: pointer;
    border-color: rgba(111, 123, 131, 0.8);
    border-left-width: 1px;
    border-left-style: solid;
    border-right-width: 1px;
    border-right-style: solid;
    color: white;
    background: #504e6180;
  }

  .nav-bar {
    margin-left: auto;
    float: left;

    .el-menu {
      background: #504e6180;
    }
  }

  .tool-bar {
    float: right;

    .theme-picker {
      padding-right: 10px;
    }

    .lang-selector {
      padding-right: 10px;
      font-size: 15px;
      color: #fff;
      cursor: pointer;
    }

    .user-info-dropdown {
      font-size: 20px;
      padding-right: 20px;
      color: #fff;
      cursor: pointer;

      img {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin: 10px 0 10px 10px;
        float: right;
      }
    }
  }
}
</style>
