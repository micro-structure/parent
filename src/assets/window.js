import { Loading, Http } from 'esc-ui'
import { Modal, message } from 'ant-design-vue'
import http, { registerHttpUrlMap } from '../api'
import { registerField } from '../assets/load'

export function initWindow () {
  registerField({
    http,
    registerHttpUrlMap,
    Http,
    loading: Loading.instance,
    modal: Modal,
    message
  })
  return window._MICRO_APP_CONFIG
}

initWindow()