import router from '../router'

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

if (!window._MICRO_APP_CONFIG_MENU) {
  console.error('window._MICRO_APP_CONFIG_MENU 路由配置不存在')
}

function appendScript (id, url) {
  const script = document.createElement('script')
  script.src = _MICRO_APP_CONFIG_SERVER + '/' + url
  script.id = /chunk/.test(url) ? `${id}-chunk` : id
  document.body.appendChild(script)
}

function appendCss(id, url) {
  const css = document.createElement('link')
  css.rel = 'stylesheet'
  css.href = _MICRO_APP_CONFIG_SERVER + '/' + url
  css.id += /chunk/.test(url) ? `${id}-chunk` : id
  css.id += '-css'
  document.head.appendChild(css)
}

function menuFind (path) {
  return window._MICRO_APP_CONFIG_MENU.find(x => x.path === path || (x.child || []).some(y => y.path === path || (y.child || []).some(z => z.path === path)))
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

// debug(`is dev`, undefined, online ? normalMenu : devMenu)
const config = window._MICRO_APP_CONFIG = {
  dev: !online,
  current: null,
  menu: window._MICRO_APP_CONFIG_MENU,
  loadQueen: {},

  addWatch: function () {
    router.beforeEach((to, from, next) => {
      const item = menuFind(to.path)
      if (item) {
        this.load(item)
      } else {
        throw new Error(`to.path ${to.path} not find in menu!`)
      }
      next()
    })
  },

  appendAssets: function (id, prefix, assetsArr) {
    assetsArr.forEach(item => {
      if (/\.js$/.test(item)) {
        appendScript(id, prefix + item)
      } else if (/\.css$/.test(item)) {
        appendCss(id, prefix + item)
      }
    })
  },

  load: function (item = this.current) {
    // 在主项目中 或 非当前子项目 启动时才需要动态加载
    // const isCurrentProject = location.origin === window._MICRO_APP_CONFIG_LOCAL_SERVER
    // debug.warn(`is current project path: ${isCurrentProject}`)
    if (!online) {
      return false
    }

    item = item || this.menu[0]
    if (!item) {
      debug.warn('当前path 未匹配到路由菜单')
      return
    }

    this.current = item
    if (!this.loadQueen[item.id] && item.entry) {
      debug(`load project url ${item.dir + item.entry}`)
      this.loadQueen[item.id] = true
      appendScript(`entry-${item.id}`, item.dir + item.entry)
    }
  },

  getCurrent: function (defaultPath) {
    const path = defaultPath || getPath()
    this.current = menuFind(path)
    return this.current
  }
}

let hasInit = false
if (!hasInit) {
  hasInit = true
  config.getCurrent()
  if (online) {
    window.addEventListener('DOMContentLoaded', () => {
      config.addWatch()
    })
  }
}

const registerField = (obj) => {
  Object.keys(obj).forEach(key => {
    config[key] = obj[key]
  })
}

export {
  getLevelPath,
  getPath,
  registerField
}

export default config
