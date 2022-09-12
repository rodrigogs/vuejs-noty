import { isVue2 } from 'vue-demi'
import Noty from 'noty'
import './styles.less'

const defaults = {
  layout: 'topRight',
  theme: 'mint',
  timeout: 5000,
  progressBar: true,
  closeWith: ['click'],
}

const VueNoty = {
  options: {},

  setOptions (opts) {
    this.options = Object.assign({}, defaults, opts)
    return this
  },

  create (params) {
    return new Noty(params)
  },

  show (text, type = 'alert', opts = {}) {
    const params = Object.assign({}, this.options, opts, {
      type,
      text
    })

    const noty = this.create(params)
    noty.show()
    return noty
  },

  success (text, opts = {}) {
    return this.show(text, 'success', opts)
  },

  error (text, opts = {}) {
    return this.show(text, 'error', opts)
  },

  warning (text, opts = {}) {
    return this.show(text, 'warning', opts)
  },

  info (text, opts = {}) {
    return this.show(text, 'info', opts)
  }
}

function installVue2(Vue, options) {
  const noty = VueNoty.setOptions(options)
  Vue.prototype.$noty = noty
  Vue.noty = noty
}

function installVue3(app, options) {
  const noty = VueNoty.setOptions(options)
  app.config.globalProperties.$noty = noty
  app.noty = noty

  app.provide('noty', noty)
}

export default {
  install: isVue2 ? installVue2 : installVue3
}
