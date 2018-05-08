/*
 * @Author: calebman 
 * @Date: 2018-03-13 17:28:00 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-03-29 20:39:35
 */

import axios from 'axios';
//读取系统配置
import conf from '../config/config.env';


// 设置基础URL
axios.defaults.baseURL = conf.baseURL;
// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config
})

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
    const data = response.data
    switch (data.errCode) {
        case '00':
            return Promise.resolve(data.data);
        default:
            return Promise.reject(data.errMsg)
    }
    // 若不是正确的返回code，且已经登录，就抛出错误
    return Promise.reject(data)
}, (err) => { // 这里是返回状态码不为200时候的错误处理
    let errMsg = "";
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                errMsg = '请求错误';
                break;

            case 401:
                errMsg = '未授权，请登录';
                break;

            case 403:
                errMsg = '拒绝访问';
                break;

            case 404:
                errMsg = `请求地址出错: ${err.response.config.url}`;
                break;

            case 408:
                errMsg = '请求超时';
                break;

            case 500:
                errMsg = '服务器内部错误';
                break;

            case 501:
                errMsg = '服务未实现';
                break;

            case 502:
                errMsg = '网关错误';
                break;

            case 503:
                errMsg = '服务不可用';
                break;

            case 504:
                errMsg = '网关超时';
                break;

            case 505:
                errMsg = 'HTTP版本不受支持';
                break;

            default:
        }
    } else {
        console.log(err)
        errMsg = err;
    }
    return Promise.reject(errMsg)
})


export default axios