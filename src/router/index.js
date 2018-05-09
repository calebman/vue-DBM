/*
 * @Author: calebman 
 * @Date: 2018-03-22 11:28:33 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-09 13:45:11
 */

import Vue from 'vue';
import Router from 'vue-router';
import { constantRouterMap, asyncRouterMap } from './routes';
Vue.use(Router);

import layout from '@/views/layout';

let router = new Router({
  routes: [{
    path: '/',
    component: layout,
    meta: { title: "数据管理系统" },
    children: [
      ...constantRouterMap,
      ...asyncRouterMap
    ]
  }, {
    path: '*',
    redirect: '/404'
  }]
});


export default router;