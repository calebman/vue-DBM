/*
 * @Author: calebman 
 * @Date: 2018-03-13 17:35:13 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-06 12:27:15
 */

import Vue from 'vue';
import Vuex from 'vuex';
import app from './app';
import business from './business';
import utils from '@/libs/utils';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app: app,
        business: business
    },
    // 持久化vuex状态
    // plugins: [createPersistedState({
    //     storage: {
    //         getItem: key => utils.getLocal(key),
    //         setItem: (key, value) => utils.saveLocal(key, value, 1 * 24 * 60 * 60),
    //         removeItem: key => utils.removeLocal(key)
    //     }
    // })]
})