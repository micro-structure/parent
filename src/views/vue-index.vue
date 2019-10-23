<template>
  <div class="vue-index">
    <div class="vue-index__header">
      <el-menu
        :default-active="menuActiveIndex"
        class="flex-grow-1"
        mode="horizontal"
        @select="handleSelect"
        background-color="#1d223e"
        text-color="#fff"
        active-text-color="#ffd04b">
        <div class="fl h60 vue-index__title f24 flex-center c-fff" style="width:200px;">主应用</div>
        <el-menu-item 
          v-for="item in menu" 
          :key="item.path"
          :index="item.path"
          @click="$parent.toMenu(item)"
        >
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="flex" style="height: calc(100vh - 60px);margin-top:-1px;">
      <div class="vue-index__aside height-100" style="width: 200px;background-color:#545c64">
        <el-menu
          class="height-100"
          :default-active="menuLeftActiveIndex"
          text-color="#fff"
          background-color='#545c64'
          active-text-color="#ffd04b"
        >
          <template v-for="item in leftMenu">
            <el-submenu
              v-if="item.child"
              :key="item.path"
              :index="item.path"
            >
              <template slot="title">
                <i v-if="item.icon" :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="child in item.child"
                  :key="child.path"
                  :index="child.path"
                  @click="$parent.toMenuChild(child)"
                >
                  <i v-if="child.icon" :class="child.icon"></i>
                  <span slot="title">{{ child.name }}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item
              v-else
              :key="item.path"
              :index="item.path"
              @click="$parent.toMenuChild(item)"
            >
              <i v-if="item.icon" :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <div id="vue-root" class="app-root">
        <router-view ref="route" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: window._MICRO_APP_CONFIG ? window._MICRO_APP_CONFIG.menu : []
    }
  },

  props: ['leftMenu', 'menuActiveIndex', 'menuLeftActiveIndex']
}
</script>