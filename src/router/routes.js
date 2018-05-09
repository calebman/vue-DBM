/*
 * @Author: calebman 
 * @Date: 2018-05-06 12:10:56 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-09 14:44:08
 */


/**
* hidden: true                   如果hidden为true则在左侧菜单栏展示，默认为false
* name:'router-name'             路由名称，必须填写
* meta : {
    roles: ['admin','editor']    权限列表，用于页面级的权限控制
    title: 'title'               对应路由在左侧菜单栏的名称
    icon: 'svg-name'             对应路由在左侧菜单栏的图标样式，样式使用iconfont图标库，见assest/iconfont文件夹
  }
**/

import login from '@/views/login';
import page404 from '@/views/error-page/404';
import page403 from '@/views/error-page/403';
import page500 from '@/views/error-page/500';
export const constantRouterMap = [
  { path: 'login', name: 'login', meta: { title: "系统登录", hidden: true }, component: login },
  { path: "404", name: "page404", meta: { title: "页面走丢了", hidden: true }, component: page404 },
  { path: "403", name: "page403", meta: { title: "权限不足", hidden: true }, omponent: page403 },
  { path: "500", name: "page500", meta: { title: "服务端异常", hidden: true }, component: page500 }
]


const layoutMain = () => import(/* webpackChunkName: "group-index" */ '@/views/main/layout-main');
export const asyncRouterMap = [
  {
    path: '/',
    name: 'main',
    redirect: '/dashboard',
    hidden: true,
    component: layoutMain,
    children: [
      { path: 'dashboard', name: 'dashboard', meta: { title: "仪表盘" }, component: () => import(/* webpackChunkName: "group-index" */'@/views/dashboard') }
    ]
  },
  {
    path: '/example',
    name: 'example',
    meta: { title: "组件演示", icon: "dbm d-icon-yanshi" },
    redirect: '/example/datatabledemo',
    component: layoutMain,
    children: [
      { path: "menucarddemo", name: "menuCardDemo", meta: { title: "菜单组件示例", icon: "dbm d-icon-qiapian" }, component: () => import('@/views/demo/menu-card-demo') },
      { path: "treeviewdemo", name: "treeViewDemo", meta: { title: "树形组件示例", icon: "dbm d-icon-shu" }, component: () => import('@/views/demo/tree-view-demo') },
      { path: "datatabledemo", name: "dataTableDemo", meta: { title: "数据表格组件示例", icon: "dbm d-icon-biaoge" }, component: () => import('@/views/demo/datatable/data-table') },
      { path: "chartsdemo", name: "chartsDemo", meta: { title: "图表组件示例", icon: "dbm d-icon-tubiao" }, component: () => import('@/views/demo/charts-demo') },
      { path: "test", name: "test", meta: { title: "布局测试", icon: "icon dbm d-icon-test" }, component: () => import('@/views/demo/layout-test') }
    ]
  }
]