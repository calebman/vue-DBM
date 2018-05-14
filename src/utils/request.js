import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';

/**
 * http请求工具类
 * 
 * 请求拦截器 负责将客户端标识token值存储并放置在头部提交给服务端
 * 
 * 响应拦截器 负责全局处理业务请求的网络或者业务错误
 */

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // 基础URL
  timeout: 5000 // 超时时间
});

// 请求拦截
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken(); // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, err => {
  console.log(err);
  Promise.reject(err);
});

// 响应拦截
service.interceptors.response.use(response => {
  /**
   * 通过response自定义errCode来标示请求状态
   */
  const res = response.data;
  switch (res.errCode) {
    // 请求成功的结果码
    case '00':
      return Promise.resolve(res.data);
    // token失效的结果码
    case '43':
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 前端登出
        store.dispatch('FedLogOut').then(() => {
          // 重新实例化vue-router对象
          location.reload();
        });
      })
      break;
    // 其他错误结果码
    default:
      Message.error(res.errMsg);
      return Promise.reject(res.errMsg);
  }
}, err => {
  console.log(err);
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
    errMsg = err;
  }
  Message.error(errMsg);
  return Promise.reject(errMsg);
});

export default service
