/*
 * @Author: calebman 
 * @Date: 2018-05-09 16:05:38 
 * @Last Modified by:   calebman 
 * @Last Modified time: 2018-05-09 16:05:38 
 */

import permission from './permission';

const install = function (Vue) {
  Vue.directive('permission', permission);
}

if (window.Vue) {
  window['permission'] = permission;
  Vue.use(install); 
}

permission.install = install;
export default permission;