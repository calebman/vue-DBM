/*
 * @Author: calebman 
 * @Date: 2018-05-09 16:04:48 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-09 16:05:59
 */

import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding;
    const roles = store.getters && store.getters.roles;

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role);
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`必须要有权限写入，例如['admin']`)
    }
  }
}