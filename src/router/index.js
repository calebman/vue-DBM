import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '../pages/ErrorPage.vue'
import Login from '../pages/Login.vue'
import Main from '../pages/Main.vue'

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
