<!-- 切换语言 -->
<template>
  <el-dropdown class="lang-selector" @command="handleCommand">
    <span class="el-dropdown-link">
      <span id="language">中文</span><i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh_cn:中文">中文</el-dropdown-item>
      <el-dropdown-item command="en_us:English">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'LangSelector',
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
    // 语言切换
    handleCommand (command) {
      let array = command.split(':')
      let lang = array[0] === '' ? 'zh_cn' : array[0]
      document.getElementById('language').innerHTML = array[1]
      this.$i18n.locale = lang
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
