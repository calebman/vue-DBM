/*
 * @Author: calebman 
 * @Date: 2018-03-22 11:28:33 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-08 13:34:10
 */

import Vue from 'vue';
import Router from 'vue-router';
import { otherRouter, appRouter, errorRouter, loginRouter } from './router';
Vue.use(Router);

let router = new Router({
  routes: [{
    path: '/',
    component: () => import(/* webpackChunkName: "group-index" */'@/views/layout'),
    meta: { title: "数据管理系统" },
    children: [
      loginRouter,
      otherRouter,
      ...appRouter,
      ...errorRouter
    ]
  }]
});


export default router;