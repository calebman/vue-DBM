/*
 * @Author: calebman 
 * @Date: 2018-05-09 09:30:02 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-11 12:38:10
 */
import { constantRouterMap, asyncRouterMap } from '@/router/routes';
const app = {
  state: {
    routerLoading: false, //路由的loading过渡
    routers: constantRouterMap, //路由表 用于生成左侧菜单
    addRouters: [] //获取到的路由
  },
  mutations: {
    //修改路由loading状态
    UPDATE_ROUTER_LOADING(state, status) {
      state.routerLoading = status
    },
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        let accessedRouters = [];
        accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
        commit('SET_ROUTERS', accessedRouters);
        resolve(accessedRouters);
      })
    }
  }
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0);
  } else {
    return true;
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

export default app
