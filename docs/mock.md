## HTTP响应模拟

### 1. 需要实现的功能

* 拦截Ajax请求并延时响应
* 返回的统一的数据格式
* 响应不同的模拟数据

### 2. 配置Mockjs拦截Ajax请求

```javascript
// see https://github.com/calebman/vue-DBM/blob/master/src/mock/index.js
// 引入Mockjs
import Mock from 'mockjs';
// 配置延时
Mock.setup({
  timeout: '300-1000'
});
// 配置拦截
Mock.mock(/\/user\/login/, 'post', loginAPI.loginByUsername);
Mock.mock(/\/user\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo);
```

### 3. 响应的统一数据格式

```javascript
// see https://github.com/calebman/vue-DBM/blob/master/src/mock/response.js
/**
 * 统一响应工具类
 * 响应统一格式的数据
 * response : {
 *    errCode: 00             响应结果码
 *    errMsg: 0000000（成功）  响应详细结果码
 *    data: null              具体数据
 * }
 */
 
export default {
  // 成功
  success: data => {
    return {
      errCode: '00',
      errMsg: '0000000（成功）',
      data: data ? data : null
    }
  },
  // 失败
  fail: (errCode, errMsg) => {
    return {
      errCode: errCode ? errCode : '04',
      errMsg: errMsg ? errMsg : '0401001（未知错误）',
      data: null
    }
  },
  // 权限不足
  unauthorized: () => {
    return {
      errCode: '43',
      errMsg: '4300001（无权访问）',
      data: null
    }
  }
}
```

### 4. 配置响应逻辑

```javascript
// see https://github.com/calebman/vue-DBM/blob/master/src/mock/login.js

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
```

### 5. 模拟随机数据

```javascript
// see https://github.com/nuysoft/Mock/wiki

import Mock from 'mockjs';

// 随机字符串
function mockStr() {
    let result = Mock.mock({ 'str': '@name' });
    return result.str;
}

// 随机数字
function mockNumber(min, max) {
    let key = 'num|' + min + '-' + max;
    let param = {}
    param[key] = 100;
    return Mock.mock(param).num;
}

// 随机小数，最高小数点后三位
function mockDecimal() {
    return Mock.Random.float(1, 100, 1, 3)
}

// 随机数组一项
const arr = ["image2.jpeg", "image3.jpeg", "image4.jpeg", "image5.jpeg", "image6.jpeg"];
function mockOneFileAddress() {
    return Mock.mock({ 'oneFile|1': arr }).oneFile;
}

// 随机日期
function mockDate() {
    let mockDateStr = Mock.Random.datetime('yyyy-MM-dd HH:mm:ss');
    // 在这里使用了momentjs将其解析为Date类型
    let mockDate = moment(mockDateStr, 'YYYY-MM-DD HH:mm:ss').toDate();
    return mockDate;
}
```

