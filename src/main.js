import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config, { registerField } from './assets/load'

import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'

import './assets/window'
import 'tcon'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#vue')

const h = React.createElement
const reactRouterChildren = []
const reactRender = function () {
  ReactDOM.render(
    h('div', { id: 'react-root', className: 'app-root' }, [
      h(HashRouter, null, reactRouterChildren)
    ]),
    document.getElementById('react')
  )
}
const addReactRoutes = function (layout) {
  reactRouterChildren.push(layout)
  reactRender()
}

registerField({
  addReactRoutes
})

// addReactRoutes(
//   h(Fragment, null, [
//     h(Route, { path: '/user/pwd' }, '密码设置')
//   ])
// )

config.load()
