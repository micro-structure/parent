module.exports = {
  publicPath: './',

  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex'
    }
  }
}
