import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '../components/framework/ErrorPage.vue'
import Login from '../components/Login.vue'
import Main from '../components/Main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/main',
      component: Main,
      meta: { requiresAuth: true }
    },
    {
      path: '/error',
      component: ErrorPage
    }
  ]
})
