<template>
  <div id="vue">
    <div id="nav">
      <span>vue 菜单：</span>
      <a v-for="item in menu" :key="item.path" :href="'#' + item.path">{{ item.name }}</a>
    </div>
    <div id="vue-root">
      <router-view ref="route" />
    </div>
  </div>
</template>

<script>
import config, { getLevelPath, getPath } from './assets/load'

export default {
  name: 'root',

  data () {
    return {
      menu: window._MICRO_APP_CONFIG ? window._MICRO_APP_CONFIG.menu : []
    }
  },

  created () {
    this.toMenu(config.getCurrent(), true)
  },

  methods: {
    async show () {
      await this.$msgbox({
        message: '我来自 parent',
        confirmButtonText: '调用 child'
      })
      this.$refs.route.show()
    },

    toMenu (item, fromLink) {
      const path = fromLink ? getPath() : item.path
      const pathArr = getLevelPath(path)
      config.getCurrent(item.path)
      this.menuActiveIndex = item.path
      this.leftMenu = item.child || []
      if (pathArr.length > 1) {
        const menuLeftActiveIndex = this.leftMenu.findIndex(x => x.path === path)
        this.toMenuChild(this.leftMenu[menuLeftActiveIndex])
      } else if (this.leftMenu.length > 0) {
        // 默认跳转第一个
        const menuLeftActiveIndex = 0
        this.toMenuChild(this.leftMenu[menuLeftActiveIndex])
      } else {
        location.href = `#${item.path}`
      }
    },

    toMenuChild (item) {
      this.menuLeftActiveIndex = item.path
      location.href = `#${item.path}`
    }
  }
}
</script>


<style lang="less">
</style>
