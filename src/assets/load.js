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
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = _MICRO_APP_CONFIG_SERVER + '/' + url
    script.id = /chunk/.test(url) ? `${id}-chunk` : id
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })
}

function appendCss(id, url) {
  return new Promise((resolve, reject) => {
    const css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = _MICRO_APP_CONFIG_SERVER + '/' + url
    css.id += /chunk/.test(url) ? `${id}-chunk` : id
    css.id += '-css'
    css.onload = resolve
    css.onerror = reject
    document.head.appendChild(css)
  })
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
    loading.open()
    const loadHandle = assetsArr.map(item => {
      if (/\.js$/.test(item)) {
        return appendScript(id, prefix + item)
      } else if (/\.css$/.test(item)) {
        return appendCss(id, prefix + item)
      }
    })
    Promise.all(loadHandle).then(() => {
      loading.close()
    }).catch(() => {
      loading.close()
    })
  },

  load: function (item = this.current) {
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

const loading = {
  node: null,
  open () {
    if (!this.node) {
      const p = document.createElement('p')
      p.innerText = '资源加载中...'
      p.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%)'
      this.node = p
      document.body.appendChild(p)
    }
  },
  close () {
    if (this.node) {
      // document.body.removeChild(this.node)
      this.node.remove()
    }
  }
}

export {
  getLevelPath,
  getPath,
  registerField
}

export default config
