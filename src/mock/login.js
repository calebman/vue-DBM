/*
 * @Author: calebman 
 * @Date: 2018-05-09 10:58:35 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-09 11:19:46
 */

import { param2Obj } from '@/utils';
import Response from './response';

const userMap = {
  admin: {
    username: 'admin',
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    username: 'editor',
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body);
    return Response.success(userMap[username]);
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url);
    if (userMap[token]) {
      return Response.success(userMap[token]);
    } else {
      return Response.fail();
    }
  },
  logout: () => Response.success()
}
