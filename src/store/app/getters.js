/*
 * @Author: calebman 
 * @Date: 2018-05-06 12:28:05 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-06 12:52:57
 */

const getters = {
  appMenu(state, getters, rootState) {
    return state.menu;
  },
  routerLoading(state, getters, rootState) {
    return state.routerLoading;
  }
}

export default getters