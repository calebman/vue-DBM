/*
 * @Author: calebman 
 * @Date: 2018-03-22 11:27:24 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-06 12:34:17
 */


import axios from '@/axios/axios';
import API from '@/config/api';
import conf from '@/config/config.env';
import utils from '@/libs/utils';
import moment from 'moment';
import qs from 'qs';


const actions = {
    //登录系统
    login({ state, commit }, loginInfo) {
        if (state.isLogin) {
            return Promise.resolve(state.userInfo);
        }
        if (loginInfo === undefined) {
            return Promise.reject();
        }
        state.userInfo = {
            username: loginInfo.username,
            name: "calebman",
            avator: "https://i.loli.net/2017/08/21/599a521472424.jpg"
        };
        state.isLogin = true;
        return Promise.resolve(state.userInfo);
    },
    //注销
    logout({ state, commit }) {
        state.userInfo = null;
        state.isLogin = false;
        return Promise.resolve();
    },
    //提交网络请求
    http({ state, commit }, config) {
        return new Promise(function (resolve, reject) {
            let url = null;
            let method = null;
            let params = null;
            if (Object.prototype.toString.call(config) == '[object Array]') {
                url = config[0];
                method = config[1];
                params = config[2];
            } else if (config.url) {
                url = config.url;
                method = config.method;
                params = config.params;
            } else {
                url = config;
            }
            http(url, method, params).then(data => {
                resolve(data);
            }).catch(err => {
                // 登录状态有误
                if (err.errCode && err.errCode == "43") {
                    state.isLogin = false;
                }
                reject(err.errMsg ? err.errMsg : err);
            })
        });
    }
}

/**
 * @description http网络请求工具类
 * @author calebman
 * @param {any} url 请求地址
 * @param {any} method 请求方法
 * @param {any} params 请求参数
 * @returns 响应结果
 */
function http(url, method, params) {
    if (!method) method = "get";
    if (!params) params = {};
    let config = {
        method: method,
        url: url
    };
    switch (method) {
        case 'post':
            config.data = qs.stringify(params, { indices: false });
            break;
        default:
            config.url = config.url + utils.toParamStr(params);
    }
    return new Promise(function (resolve, reject) {
        axios(config).then(function (data) {
            console.log(`response data => ${JSON.stringify(data)}`)
            resolve(data);
        }).catch(function (errMsg) {
            console.error(`response errMsg => ${JSON.stringify(errMsg)}`)
            reject(errMsg);
        })
    });
};

export default actions;