import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import './plugins/element.js'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import '@/icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from '@/filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 解决 Vue 重复点击相同路由报错
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
