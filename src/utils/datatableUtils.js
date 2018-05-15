/*
 * @Author: calebman 
 * @Date: 2018-04-26 10:01:50 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-11 10:55:42
 */


// 当文件不能预览时显示其文件图标的根目录路径
const thumbnailIconUrlRoot = "static/local/suffix/";
// 图片文件的后缀格式
const imgSuffixs = ['bmp', 'png', 'gif', 'jpg', 'jpeg'];
// 视频文件的后缀格式
const videoSuffixs = ['mp4', 'rmvb', 'avi', 'ts'];

// 数据筛选可选项
const dataFilterRule = {
  varchar: [
    { name: '=', title: '等于' },
    { name: '!=', title: '不等于' },
    { name: 'LIKE', title: '包含' },
    { name: 'NOT LIKE', title: '不包含' },
    { name: 'IS NULL', title: '为空' },
    { name: 'IS NOT NULL', title: '非空' }
  ],
  decimal: [
    { name: '=', title: '等于' },
    { name: '>=', title: '大于' },
    { name: '<=', title: '小于' },
    { name: 'IS NULL', title: '为空' },
    { name: 'IS NOT NULL', title: '非空' }
  ],
  datetime: [
    { name: '<', title: '在此之前' },
    { name: '=', title: '等于' },
    { name: '>', title: '在此之后' },
    { name: 'IS NULL', title: '为空' },
    { name: 'IS NOT NULL', title: '非空' }
  ],
  text: [
    { name: 'LIKE', title: '包含文件名' },
    { name: 'IS NULL', title: '为空' },
    { name: 'IS NOT NULL', title: '非空' }
  ]
}

/**
 * @description 获取展示不能预览的文件的缩略图标
 * @author calebman
 * @param {any} relativePath 文件相对路径
 * @returns 图标相对路径
 */
function getThumbnailIconUrl(relativePath) {
  let iconurl = thumbnailIconUrlRoot + getRelativePathSuffix(relativePath) + '.png';
  let emptyUrl = thumbnailIconUrlRoot + "empty.png";
  var xmlHttp;
  if (window.ActiveXObject) {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  } else if (window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  }
  xmlHttp.open("Get", iconurl, false);
  xmlHttp.send();
  if (xmlHttp.status == 404) {
    return emptyUrl;
  }
  return iconurl;
}

/**
 * @description 获取文件相对路径对应的后缀名称 不区分大小写
 * @author calebman
 * @param {any} relativePath 文件相对路径
 * @returns 文件后缀名称
 */
function getRelativePathSuffix(relativePath) {
  if (relativePath.indexOf('.') < 0) {
    return 'empty';
  }
  return relativePath.substring(relativePath.indexOf('.') + 1, relativePath.length).toLowerCase();
}

/**
 * @description 判断相对路径下的文件是否为图片
 * @author calebman
 * @param {any} relativePath 文件相对路径
 * @returns true为图片
 */
function isImg(relativePath) {
  return checkSuffix(relativePath, imgSuffixs);
}

/**
 * @description 判断相对路径下的文件是否为视频
 * @author calebman
 * @param {any} relativePath 文件相对路径
 * @returns true为视频
 */
function isVideo(relativePath) {
  return checkSuffix(relativePath, videoSuffixs);
}

function checkSuffix(relativePath, suffixs) {
  let fileSuffix = getRelativePathSuffix(relativePath);
  for (let index in suffixs) {
    let suffix = suffixs[index];
    if (fileSuffix.toLowerCase() == suffix) {
      return true;
    }
  }
  return false;
}

/**
 * @description 获取相对路径下的文件的文件名称
 * @author calebman
 * @param {any} relativePath 文件相对路径
 * @returns 文件名称
 */
function getFileNameFromRelativePath(relativePath) {
  let start = relativePath.indexOf("/") > -1 ? relativePath.indexOf("/") : 0;
  let end = relativePath.indexOf(".") > -1 ? relativePath.indexOf(".") : relativePath.length;
  return relativePath.substring(start, end);
}

/**
 * @description 转换文件列的源数据为标准数据格式 转换失败返回{root:"",files:[]}
 * @author calebman
 * @param {any} value 文件列的源数据
 * @returns 标准数据格式
 */
function covertFileColumnValue(value) {
  if (Object.prototype.toString.call(value) === '[object Object]'
    && value.root && value.files
    && Object.prototype.toString.call(value.files) === '[object Array]') {
    return value;
  } else if (typeof value == 'string') {
    try {
      return covertFileColumnValue(JSON.parse(value));
    } catch (e) {
      console.warn("covert file column value to json is failed , value is " + value);
      return { root: "", files: [] };
    }
  }
  return { root: "", files: [] };
}

export default {
  dataFilterRule: dataFilterRule,
  getThumbnailIconUrl: getThumbnailIconUrl,
  getFileNameFromRelativePath: getFileNameFromRelativePath,
  isImg: isImg,
  isVideo: isVideo,
  covertFileColumnValue: covertFileColumnValue
}