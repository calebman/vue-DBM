/*
 * @Author: calebman 
 * @Date: 2018-03-13 17:35:13 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-16 11:21:25
 */

import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import getters from './getters';

import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app,
        user
      },
      getters
})