/*
 * @Author: calebman 
 * @Date: 2018-05-09 12:03:26 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-14 10:39:28
 */

import router from './router';
import store from './store';
import { Message } from 'element-ui';
import { getToken } from '@/utils/auth';


const whiteList = ['/login', '/404', '/401']; // 免登白名单

router.beforeEach((to, from, next) => {
  store.commit('UPDATE_ROUTER_LOADING', true); // 展示路由加载时动画
  if (getToken()) {  // 存在token
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完用户信息
        store.dispatch('GetUserInfo').then(data => { // 拉取用户信息
          const roles = data.roles // 权限表必须为数组,例如: ['admin','editer']
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(err => { // 拉取用户信息失败，提示登录状态失效
          store.dispatch('FedLogOut').then(() => {
            Message.error('登录状态失效, 请重新登录');
            next({ path: '/login' });
          })
        })
      } else {
        if (hasPermission(store.getters.roles, to.meta.roles)) { // 动态权限匹配
          next();
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true } });
        }
      }
    }
  } else { // 没有token
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
    }
  }
});

router.afterEach(to => {
  store.commit('UPDATE_ROUTER_LOADING', false);
});

router.onError(err => {
  console.error(err); // for bug
  store.commit('UPDATE_ROUTER_LOADING', false);
});

// 判断是否有权限
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) {
    return true
  }
  if (!permissionRoles) {
    return true
  }
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}