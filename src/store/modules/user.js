import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    username: null, // 用户名
    status: false, // 登录状态
    token: getToken(), // 客户端记号
    name: null, // 用户姓名
    avatar: null, // 用户头像
    introduction: null, //用户介绍
    roles: [], //权限数据
    setting: { // 用户个性设置
      articlePlatform: []
    }
  },

  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(data => {
          commit('SET_USERNAME', username);
          commit('SET_TOKEN', data.token);
          setToken(data.token);
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(data => {
          commit('SET_USERNAME', data.username);
          commit('SET_STATUS', true);

          commit('SET_ROLES', data.roles);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_INTRODUCTION', data.introduction);
          resolve(data);
        }).catch(error => {
          reject(error);
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          this.dispatch('FedLogOut');
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },

    // 前端被迫登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', null);
        commit('SET_STATUS', false);
        commit('SET_USERNAME', null);
        commit('SET_ROLES', []);
        commit('SET_NAME', null);
        commit('SET_AVATAR', null);
        commit('SET_INTRODUCTION', null);
        removeToken();
        resolve();
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role);
        setToken(role);
        getUserInfo(role).then(data => {
          commit('SET_ROLES', data.roles);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_INTRODUCTION', data.introduction);
          resolve();
        })
      })
    }
  }
}

export default user
