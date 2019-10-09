import router from '../router'

(function (win) {
  let devMenu
  let normalMenu

  if (win._MICRO_APP_CONFIG) {
    devMenu = win._MICRO_APP_CONFIG.devMenu
    normalMenu = win._MICRO_APP_CONFIG.normalMenu
  } else {
    throw '路由配置不存在'
  }

  function appendScript (id, url) {
    const script = document.createElement('script')
    script.src = url
    script.id = id
    document.body.appendChild(script)
  }
  const isDev = location.port !== '80' && location.port !== '443'
  function debug(message, type = 'log') {
    if (isDev) {
      console[type](`【micro】${message}`)
    }
  }
  debug.warn = function (message) {
    debug(message, 'warn')
  }

  debug('is dev')
  const config = win._MICRO_APP_CONFIG = {
    menu: isDev ? devMenu : normalMenu,

    addWatch: function () {
      router.beforeEach((to, from, next) => {
        const item = this.menu.find(x => x.path === to.path)
        this.load(item)
        next()
      })
    },

    loadQueen: {},
    load: function (item) {
      // 开发环境下
      // 在主项目中 或 非当前子项目 启动时才需要动态加载
      const isCurrentProject = isDev && location.origin === item.origin
      debug.warn(`is current project path: ${isCurrentProject}`)
      if (!this.loadQueen[item.id] && !isCurrentProject) {
        debug(`load project url ${item.origin + item.urlPath}`)
        this.loadQueen[item.id] = true
        appendScript(item.id, item.origin + item.urlPath)
      }
    }
  }

  let hash = location.hash
  if (!hash) {
    hash = '#/'
  }
  const index = hash.indexOf('?')
  const path = hash.substr(1, index > -1 ? index - 1 : undefined)
  const currentMenu = window._MICRO_APP_CONFIG.menu.find(x => x.path === path)

  config.load(currentMenu)

  window.addEventListener('DOMContentLoaded', () => {
    config.addWatch()
  })
})(window)
