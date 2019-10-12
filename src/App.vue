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
export default {
  name: 'root',

  data () {
    return {
      menu: window._MICRO_APP_CONFIG ? window._MICRO_APP_CONFIG.menu : []
    }
  },

  created () {
  },

  methods: {
    async show () {
      await this.$msgbox({
        message: '我来自 parent',
        confirmButtonText: '调用 child'
      })
      this.$refs.route.show()
    }
  }
}
</script>


<style lang="less">
</style>
