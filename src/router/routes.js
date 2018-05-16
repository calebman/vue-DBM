/*
 * @Author: calebman 
 * @Date: 2018-05-06 12:10:56 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-16 11:18:23
 */


/**
* hidden: true                   如果hidden为true则在左侧菜单栏展示，默认为false
* name:'router-name'             路由名称，必须填写
* meta : {
    roles: ['admin','editor']    权限列表，用于页面级的权限控制，默认不设置代表任何权限均可访问
    title: 'title'               对应路由在左侧菜单栏的标题名称
    icon: 'icon-class'             对应路由在左侧菜单栏的图标样式，样式使用iconfont图标库，见assest/iconfont文件夹
  }
**/

import login from '@/views/login';
import page404 from '@/views/error-page/404';
import page401 from '@/views/error-page/401';
export const constantRouterMap = [
  { path: '/login', name: 'login', meta: { title: "系统登录", hidden: true }, component: login },
  { path: "/404", name: "page404", meta: { title: "页面走丢了", hidden: true }, component: page404 },
  { path: "/401", name: "page401", meta: { title: "权限不足", hidden: true }, component: page401 }
]


const layout = () => import(/* webpackChunkName: "group-index" */ '@/views/layout');
export const asyncRouterMap = [
  {
    path: '/',
    name: 'main',
    redirect: '/dashboard',
    hidden: true,
    component: layout,
    children: [
      { path: 'dashboard', name: 'dashboard', meta: { title: "仪表盘" }, component: () => import(/* webpackChunkName: "group-index" */'@/views/dashboard') }
    ]
  },
  {
    path: '/permission',
    name: 'permission',
    meta: { title: "权限页", icon: "dbm d-icon-quanxian" },
    redirect: '/permission/adminpermission',
    component: layout,
    children: [
      { path: "adminpermission", name: "adminPermission", meta: { title: "管理员权限页", roles: ["admin"] }, component: () => import('@/views/permission/admin') },
      { path: "watcherpermission", name: "watcherPermission", meta: { title: "游客权限页", roles: ["admin", "watcher"] }, component: () => import('@/views/permission/watcher') },
      { path: "elementpermission", name: "elementPermission", meta: { title: "元素级别权限" }, component: () => import('@/views/permission/element') }
    ]
  },
  {
    path: '/errorpage',
    name: 'errorpage',
    meta: { title: "错误页面", icon: "dbm d-icon-error" },
    redirect: '/errorpage/404',
    component: layout,
    children: [
      { path: "401", name: "unauthorized", meta: { title: "401页面", icon: "dbm d-icon-403" }, component: page401 },
      { path: "404", name: "pageNotFound", meta: { title: "404页面", icon: "dbm d-icon-msnui-404" }, component: page404 }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]