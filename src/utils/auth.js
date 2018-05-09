/*
 * @Author: calebman 
 * @Date: 2018-05-09 09:36:36 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-09 14:47:06
 */

/**
 * 使用cookie存储token值
 */

import Cookies from 'js-cookie';

const tokenKey = 'User-Token'

export function getToken() {
  return Cookies.get(tokenKey);
}

export function setToken(token) {
  return Cookies.set(tokenKey, token);
}

export function removeToken() {
  return Cookies.remove(tokenKey);
}
