/*
 * @Author: calebman 
 * @Date: 2018-05-09 11:06:54 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-15 10:13:31
 */

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