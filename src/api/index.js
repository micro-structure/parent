import { Http, Loading } from 'esc-ui'
import { message } from 'ant-design-vue'

export const LOGIN_URL = `//sso.uban360.net/sso/#/login?target=${location.href}`

export function registerHttpUrlMap (obj) {
  http.options.urlMap = {
    ...http.options.urlMap,
    ...obj
  }
}

const http = new Http({
  // baseUrl: 'http://superadmin.jituancaiyun.net/',
  baseUrl: '//sso.uban360.net',
  contentType: 'application/json;charset=UTF-8',
  urlMap: {
    menu: '/ca/menu/menus'
  },
  notify: {
    success: message.success,
    error: message.error
  },
  loadingMethods: Loading.instance,
  beforeCatch (res) {
    if (res.code === 400) location.href = LOGIN_URL
    return res
  }
})

export default http
