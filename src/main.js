// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const script = document.createElement('script')
script.src = 'http://localhost:8080/app.js'
document.body.appendChild(script)

window.addEventListener('DOMContentLoaded', () => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})

