import router from '../router'

let devMenu
let normalMenu

/**
 * 根据当前 href 获取路由
 */
const getPath = function () {
  let hash = location.hash
  if (!hash) {
    hash = '#/'
  }
  const index = hash.indexOf('?')
  const path = hash.substr(1, index > -1 ? index - 1 : undefined)
  return path
}

/**
 * 将路由转化为数组
 * @param {String} path 路由
 */
const getLevelPath = (path) => (path === '/' || path === '')
  ? ['/']
  : path.split('/').filter(Boolean).map((item, i, arr) => `/${arr.slice(0, i + 1).join('/')}`)

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
function appendCss(id, url) {
  const css = document.createElement('link')
  css.rel = 'stylesheet'
  css.href = url
  css.id = `${id}-css`
  document.head.appendChild(css)
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
const config = {
  dev: !online,
  current: null,
  menu: online ? normalMenu : devMenu,
  loadQueen: {},
  addWatch: function () {
    router.beforeEach((to, from, next) => {
      // const pathArr = getLevelPath(to.path)
      const item = this.menu.find(x => x.path === to.path || (x.child || []).some(y => y.path == to.path))
      this.load(item)
      next()
    })
  },
  load: function (item = this.current) {
    item = item || this.menu[0]
    if (!item) {
      debug.warn('当前path 未匹配到路由菜单')
      return
    }

    this.current = item
    // 在主项目中 或 非当前子项目 启动时才需要动态加载
    const isCurrentProject = location.origin === item.origin
    debug.warn(`is current project path: ${isCurrentProject}`)
    if (isCurrentProject) {
      return
    }
    if (!this.loadQueen[item.id]) {
      debug(`load project url ${item.origin + item.urlPath}`)
      this.loadQueen[item.id] = true
      appendScript(item.id, item.origin + item.urlPath)
      if (item.appCss) {
        appendCss(item.id, item.origin + item.appCss)
      }
      if (item.chunkCss) {
        appendCss(item.id + '-chunk', item.origin + item.chunkCss)
      }
      if (item.chunkPath) {
        appendScript(item.id + '-chunk', item.origin + item.chunkPath)
      }
    }
  },
  getCurrent: function (defaultPath) {
    const path = defaultPath || getPath()
    this.current = this.menu.find(x => x.path === path || (x.child || []).some(y => y.path === path))
    return this.current
  }
}

config.getCurrent()
window.addEventListener('DOMContentLoaded', () => {
  config.addWatch()
})

window._MICRO_APP_CONFIG = {
  ...config,
  ...(window._MICRO_APP_CONFIG || {})
}

export {
  getLevelPath,
  getPath
}

export default config
