import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './assets/load'

import React from 'react'
import ReactDOM from 'react-dom'
import * as ReactRouterDOM from 'react-router-dom'

Vue.config.productionTip = false

// window.addEventListener('DOMContentLoaded', () => {
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#vue')

const h = React.createElement

console.log('main mount')
ReactDOM.render(
  h('div', null, [
    h(ReactRouterDOM.HashRouter, {}, [
      h('span', null, 'react 菜单：'),
      h(ReactRouterDOM.Link, { to: '/' }, 'index'),
      h(ReactRouterDOM.Link, { to: '/second' }, 'second')
    ]),
    h('div', { id: 'react-root' })
  ]),
  document.getElementById('react')
)
// })

config.load()
