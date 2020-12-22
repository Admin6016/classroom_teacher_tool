import Vue from 'vue'



import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import pluginImport from '@d2-projects/vue-table-import'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import dataV from '@jiaminghi/data-view'

Vue.use(dataV)

Vue.use(VueQuillEditor)

import App from './App'
import store from './store'
import router from './router'
import { Card, Icon, List, Spin, Empty, Descriptions, Avatar, Tooltip, Comment } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import '@/styles/global.css'
Vue.use(Card)
Vue.use(pluginImport)
Vue.use(Icon)
Vue.use(List)
Vue.use(Spin)
Vue.use(Empty)
Vue.use(Descriptions)
Vue.use(Avatar)
Vue.use(Tooltip)
Vue.use(Comment)
// 导入card组件

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,

  render: h => h(App)
})
