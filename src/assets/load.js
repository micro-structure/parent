import router from '../router'

let devMenu
let normalMenu

if (window._MICRO_APP_CONFIG) {
  devMenu = window._MICRO_APP_CONFIG.devMenu
  normalMenu = window._MICRO_APP_CONFIG.normalMenu
} else {
  console.warn('路由配置不存在')
}

function appendScript (id, url) {
  const script = document.createElement('script')
  script.src = url
  script.id = id
  document.body.appendChild(script)
}
const online = ['80', '85', '443', ''].includes(location.port)
function debug(message, type = 'log', args) {
  if (!online) {
    if (args !== undefined) {
      console[type](`【micro】${message}`, args)
    } else {
      console[type](`【micro】${message}`)
    }
  }
}
debug.warn = function (message) {
  debug(message, 'warn')
}

debug(`is dev`, undefined, online ? normalMenu : devMenu)
const config = window._MICRO_APP_CONFIG = {
  current: null,

  menu: online ? normalMenu : devMenu,

  addWatch: function () {
    router.beforeEach((to, from, next) => {
      const item = this.menu.find(x => x.path === to.path)
      this.load(item)
      next()
    })
  },

  loadQueen: {},
  load: function (item = this.current) {
    if (!item) {
      debug('当前path 未匹配到路由菜单')
      item = this.menu[0]
    }

    // 开发环境下
    // 在主项目中 或 非当前子项目 启动时才需要动态加载
    const isCurrentProject = !online && location.origin === item.origin
    debug.warn(`is current project path: ${isCurrentProject}`)
    if (!this.loadQueen[item.id] && !isCurrentProject) {
      debug(`load project url ${item.origin + item.urlPath}`)
      this.loadQueen[item.id] = true
      appendScript(item.id, item.origin + item.urlPath)
      if (online && item.chunkPath) {
        appendScript(item.id + '-chunk', item.origin + item.chunkPath)
      }
    }
  }
}

let hash = location.hash
if (!hash) {
  hash = '#/'
}
const index = hash.indexOf('?')
const path = hash.substr(1, index > -1 ? index - 1 : undefined)

config.current = window._MICRO_APP_CONFIG.menu.find(x => x.path === path)
// config.load(currentMenu)

window.addEventListener('DOMContentLoaded', () => {
  config.addWatch()
})

export default config
