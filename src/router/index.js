/*
 * @Author: calebman 
 * @Date: 2018-03-22 11:28:33 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-14 09:47:22
 */

import Vue from 'vue';
import Router from 'vue-router';
import { constantRouterMap } from './routes';
Vue.use(Router);

let router = new Router({
  routes: constantRouterMap
});


export default router;