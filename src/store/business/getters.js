/*
 * @Author: calebman 
 * @Date: 2018-05-06 12:28:05 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-06 12:32:17
 */

const getters = {
  userInfo(state, getters, rootState) {
    return state.userInfo;
  },
  isLogin(state, getters, rootState) {
    return state.isLogin;
  },
}

export default getters