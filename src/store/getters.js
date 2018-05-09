/*
 * @Author: calebman 
 * @Date: 2018-05-09 09:32:01 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-09 14:35:37
 */

const getters = {
  permissionRouters: state => state.app.routers, // 符合权限的路由
  addRouters: state => state.app.addRouters, // 根据权限获取到的路由列表
  routerLoading: state => state.app.routerLoading, // 路由加载标识
  username: state => state.user.username, // 用户名
  token: state => state.user.token, // token
  avatar: state => state.user.avatar, // 头像信息
  name: state => state.user.name, // 用户姓名
  introduction: state => state.user.introduction, // 用户简介
  roles: state => state.user.roles, // 用户权限
  setting: state => state.user.setting, // 用户个性化设置
  isLogin: state => state.user.status, // 登录状态
}
export default getters
