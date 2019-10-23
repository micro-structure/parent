<template>
  <div id="vue">
    <vue-index 
      :leftMenu="leftMenu"
      :menuActiveIndex="menuActiveIndex"
      :menuLeftActiveIndex="menuLeftActiveIndex"
    />
  </div>
</template>

<script>
import config, { getLevelPath, getPath } from './assets/load'
import VueIndex from './views/vue-index.vue'

export default {
  name: 'root',

  components: {
    VueIndex
  },

  data () {
    return {
      leftMenu: [],
      menuActiveIndex: '',
      menuLeftActiveIndex: ''
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
      if (!item) {
        console.warn('path 不存在')
        return
      }

      const path = fromLink ? getPath() : item.path
      const pathArr = getLevelPath(path)
      const findArr = (arr, assert) => {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].child) {
            return findArr(arr[i].child, assert)
          } else if (assert(arr[i])) {
            return arr[i]
          }
        }
      }

      config.getCurrent(item.path)
      this.menuActiveIndex = item.path
      this.leftMenu = item.child || []
      if (pathArr.length > 1) {
        const target = findArr(this.leftMenu, item => item.path === path)
        this.toMenuChild(target)
      } else if (this.leftMenu.length > 0) {
        const target = findArr(this.leftMenu, item => !!item.path)
        this.toMenuChild(target)
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
#vue {
  height: 100vh;
}
@header-height: 60px;
@left-width: 200px;
.app-root {
  position: absolute;
  top: @header-height;
  right: 0;
  left: @left-width;
}
</style>
