/*
 * @Author: calebman 
 * @Date: 2018-05-09 16:04:48 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-14 10:43:12
 */

import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding; // 获取自定义指令传入的鉴权信息
    const roles = store.getters && store.getters.roles; // 从状态管理中获取当前用户的路由信息

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;

      const hasPermission = roles.some(role => { // 判断用户是否包含该元素所需权限
        return permissionRoles.includes(role);
      })

      if (!hasPermission) { // 权限不足
        el.parentNode && el.parentNode.removeChild(el); // 移除该dom元素
      }
    } else {
      throw new Error(`必须要有权限写入，例如['admin']`)
    }
  }
}