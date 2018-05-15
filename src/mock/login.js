/*
 * @Author: calebman 
 * @Date: 2018-05-09 10:58:35 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-15 10:15:01
 */

import { param2Obj } from '@/utils';
import Response from './response';

const userMap = {
  admin: {
    password: 'admin',
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  watcher: {
    password: 'watcher',
    roles: ['watcher'],
    token: 'watcher',
    introduction: '我是游客',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Watcher'
  }
}

export default {
  // 使用用户名登录
  loginByUsername: config => {
    const { username, password } = JSON.parse(config.body);
    if (userMap[username] && userMap[username].password === password) {
      return Response.success(userMap[username]);
    } else {
      return Response.fail("01", "0101001（用户名或密码错误）")
    }
  },
  // 拉取用户信息
  getUserInfo: config => {
    const { token } = param2Obj(config.url);
    if (userMap[token]) {
      return Response.success(userMap[token]);
    } else {
      return Response.fail();
    }
  },
  // 注销
  logout: () => Response.success()
}
