/*
 * @Author: calebman 
 * @Date: 2018-05-09 10:58:42 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-14 09:24:35
 */

/**
 * 数据的本地Mock，引入此文件将根据对应的配置拦截系统的Http请求并模拟响应数据
 * 用于开发环境的自测
 */
import Mock from 'mockjs';
import loginAPI from './login';

Mock.setup({
  timeout: '300-1000'
});


// 登录相关
Mock.mock(/\/user\/login/, 'post', loginAPI.loginByUsername);
Mock.mock(/\/user\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo);
export default Mock;
