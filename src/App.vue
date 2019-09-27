<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">首页</router-link> |
      <router-link to="/structure">结构说明</router-link> |
      <router-link to="/about">关于</router-link>
    </div>
    <router-view ref="route" />
  </div>
</template>

<script>
export default {
  name: 'root',

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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
