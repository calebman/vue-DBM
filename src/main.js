// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 引入moment.js工具
import moment from 'moment'
//加载中文
// moment.lang('zh_cn');
Vue.prototype.$moment = moment

// 全局引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, { size: 'small' })

//引入本项目基础样式
import '@/assets/themes-base/index.css';
// 引入字体图标
import '@/assets/iconfont/iconfont.css';

import './mock' // 模拟数据
import './permission' // 路由权限控制


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
