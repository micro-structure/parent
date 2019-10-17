import { Loading, Http } from 'esc-ui'
import { Modal, message } from 'ant-design-vue'
import http, { LOGIN_URL, registerHttpUrlMap } from '../api'

window._MICRO_APP_CONFIG = {
  ...(window._MICRO_APP_CONFIG || {}),
  http,
  registerHttpUrlMap,
  Http,
  loading: Loading.instance,
  loginUrl: LOGIN_URL,
  modal: Modal,
  message
}
