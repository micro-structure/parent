module.exports = {
  publicPath: './',

  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      react: 'React',
      'react-router-dom': 'ReactRouterDOM',
      'react-dom': 'ReactDOM'
    }
  }
}
