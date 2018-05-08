/*
 * @Author: calebman 
 * @Date: 2018-03-13 16:48:16 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-04-20 10:16:27
 */

/**
 * @author calebman
 * @description 将秒数转化为 时、分、秒的描述 接受数字、数字数组的参数
 */
function toTime(obj, arr) {
    if (!isNaN(obj)) {
        let hours = Math.floor(obj / 3600);
        let minutes = Math.floor(obj / 60 % 60);
        let seconds = Math.floor(obj % 60);
        if (hours > 0) return `${hours}时${minutes}分${seconds}秒`;
        else if (minutes > 0) return `${minutes}分${seconds}秒`;
        else return `${seconds}秒`;
    } else if (Object.prototype.toString.call(obj) == '[object Array]') {
        if (!arr) arr = [];
        for (let index in obj) {
            arr.push(toTime(obj[index]), arr);
        }
        return arr;
    }
}

/**
 * @author calebman
 * @description 将对象、数组类型转化为字符串使用&拼接起来
 */
function toParamStr(obj) {
    let paramStr = "";
    let isHasParam = false;
    for (let key in obj) {
        let value = obj[key];
        switch (Object.prototype.toString.call(value)) {
            case "[object object]":
                for (let objKey in obj[key]) {
                    paramStr += objKey + "=" + toParam(obj[key][objKey]) + "&";
                }
                break;
            case "[object Array]":
                for (let objIndex in obj[key]) {
                    paramStr += key + "=" + toParam(obj[key][objIndex]) + "&";
                }
                break;
            default:
                let getV = toParam(obj[key]);
                if (getV != null) {
                    let pattern = new RegExp("[`;/?:@&=+$,#~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
                    if (pattern.test(getV)) {
                        getV = encodeURIComponent(getV);
                    }
                    paramStr += key + "=" + getV + "&";
                }

        }
        isHasParam = true;
    }
    if (isHasParam) {
        return "?" + paramStr.substr(0, paramStr.length - 1);
    } else {
        return "";
    }
}

/**
 * @author calebman
 * @description 将obj类型转化为字符串参数
 */
function toParam(obj) {
    if (obj) {
        if (obj instanceof Date) {
            return moment(obj).format("YYYYMMDDHHmmss");
        } else {
            return obj.toString();
        }
    } else if (!isNaN(obj)) {
        return obj;
    } else {
        return null;
    }
}

/**
 * @description 判断是否为Andorid系统手机
 * @author calebman
 * @returns boolean
 */
function isAndroid() {
    let u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
}

/**
 * @description 判断是否为IOS系统手机
 * @author calebman
 * @returns boolean
 */
function isIOS() {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isiOS;
}

/**
 * @description 判断是否为微信浏览器
 * @author calebman
 * @returns Boolean
 */
function isWeiXin() {
    let u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

/**
 * @description 判断是否为身份证号
 * @author calebman
 * @param {any} idcard 身份证号码
 * @returns Boolean
 */
function checkIdcard(idcard) {

    var Errors = new Array(
        "验证通过!",
        "身份证号码位数不对!",
        "身份证号码出生日期超出范围或含有非法字符!",
        "身份证号码校验错误!",
        "身份证地区非法!"
    );
    var area = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    }

    var idcard, Y, JYM;
    var S, M;
    var idcard_array = new Array();
    idcard_array = idcard.split("");
    /*地区检验*/
    if (area[parseInt(idcard.substr(0, 2))] == null) {
        //alert(Errors[4]);

        return false;
    }
    /*身份号码位数及格式检验*/
    switch (idcard.length) {
        case 15:
            if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
            } else {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
            }
            if (ereg.test(idcard)) {
                //alert(Errors[0]+"15");
                return true; //15位验证通过
            }
            else {
                //alert(Errors[2]);
                return false;
            }
            break;

        case 18:
            //18位身份号码检测
            //出生日期的合法性检查
            //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
            if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
            } else {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
            }
            if (ereg.test(idcard)) {//测试出生日期的合法性
                //计算校验位
                S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                    + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                    + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                    + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                    + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                    + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                    + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                    + parseInt(idcard_array[7]) * 1
                    + parseInt(idcard_array[8]) * 6
                    + parseInt(idcard_array[9]) * 3;
                Y = S % 11;
                M = "F";
                JYM = "10X98765432";
                M = JYM.substr(Y, 1);
                /*判断校验位*/
                if (M == idcard_array[17]) {
                    //alert(Errors[0]+"18");
                    return true;
                    /*检测ID的校验位false;*/
                }
                else {
                    //alert(Errors[3]);
                    return false;
                }
            }
            else {
                //alert(Errors[2]);
                return false;
            }
            break;

        default:
            //alert(Errors[1]);
            return false;
    }
}

/**
 * @description 根据身份证号码获取出生日期
 * @author calebman
 * @param {any} iIdNo 身份证号码
 */
function getBirthdatByIdNo(iIdNo) {
    var tmpStr = "";

    if (iIdNo.length == 15) {
        tmpStr = iIdNo.substring(6, 12);
        tmpStr = "19" + tmpStr;
        let month = parseInt(tmpStr.substring(4, 6));
        if (month > 12) {
            return null;
        }
        let days = parseInt(tmpStr.substring(6));
        if (days > 31) {
            return null;
        }
        tmpStr = tmpStr.substring(0, 4) + "-" + month + "-" + days;
        return tmpStr;
    } else if (iIdNo.length == 18) {
        tmpStr = iIdNo.substring(6, 14);
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
        return tmpStr;
    }
}

/**
 * @description 根据身份证号码获取性别
 * @author calebman
 * @param {any} iIdNo 身份证号码
 */
function getSexByIdNo(iIdNo) {
    if (iIdNo.length == 15) {
        return parseInt(iIdNo.substr(14, 1)) % 2 == 1 ? "男" : "女";
    } else if (iIdNo.length == 18) {
        return parseInt(iIdNo.substr(16, 1)) % 2 == 1 ? "男" : "女";
    }
}

/**
 * @description 校验是否为受理编号
 * @author calebman
 * @param {any} slbh 受理编号
 * @returns boolean
 */
function checkSlbh(slbh) {
    var reg = /^[a-zA-Z\d]{15}$/g;
    if (slbh.length <= 0 || !slbh.match(reg)) {
        return false;
    } else {
        return true;
    }
}

/**
 * @description 将数据持久化存储
 * @author calebman
 * @param {any} key 数据的标识
 * @param {any} value 待持久化的数据
 * @param {any} expirySeconds 数据的有效秒数
 * @param {any} userFlag 用户标识
 */
function saveLocal(key, value, expirySeconds, userFlag) {
    if (userFlag) {
        key = `${userFlag}_${key}`;
    }
    let localSaveTime = getLocalSaveTime(key, null);
    let obj = {};
    // obj.type = Object.prototype.toString.call(value);
    obj.value = value;
    obj.firstSaveTime = localSaveTime ? localSaveTime : Date.now();
    obj.expirySeconds = expirySeconds;
    localStorage.setItem(key, JSON.stringify(obj));
}

/**
 * @description 取出持久化存储的数据
 * @author calebman
 * @param {any} key 数据的标识
 * @param {any} userFlag 用户标识
 * @returns 源数据
 */
function getLocal(key, userFlag) {
    if (userFlag) {
        key = `${userFlag}_${key}`;
    }
    let str = localStorage.getItem(key);
    let obj = toJSON(str);
    if (obj) {
        let check = true;
        if (obj.firstSaveTime && obj.expirySeconds) {
            check = Date.now() - obj.firstSaveTime < obj.expirySeconds * 1000;
        }
        if (check) {
            // switch (obj.type) {
            //     case "[object object]":
            //         return JSON.parse(obj.value);
            //     case "[object Array]":
            //         return JSON.parse(obj.value);
            //     default:
            //         return obj.value;
            // }
            return obj.value;
        }
        return null;
    }
    return null;
}

/**
 * @description 移除持久化的数据
 * @author calebman
 * @param {any} key 数据的标识
 * @param {any} userFlag 用户标识
 */
function removeLocal(key, userFlag) {
    if (userFlag) {
        key = `${userFlag}_${key}`;
    }
    localStorage.removeItem(key);
}


/**
 * @description 获取持久化存储的初始存入时间
 * @author calebman
 * @param {any} key 数据的标识
 * @param {any} userFlag 用户标识
 * @returns number/null
 */
function getLocalSaveTime(key, userFlag) {
    if (userFlag) {
        key = `${userFlag}_${key}`;
    }
    let str = localStorage.getItem(key);
    let obj = toJSON(str);
    if (obj && obj.firstSaveTime && obj.expirySeconds) {
        if (Date.now() - obj.firstSaveTime < obj.expirySeconds * 1000) {
            return obj.firstSaveTime;
        }
    }
    return null;
}

/**
 * @description 转化属于JSON对象的字符串
 * @author calebman
 * @param {any} str 待判断字符串
 * @returns object/null
 */
function toJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (str.indexOf('{') > -1) {
                return obj;
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    }
    return null;
}

export default {
    toParamStr: toParamStr,
    toTime: toTime,
    isAndroid: isAndroid,
    isIOS: isIOS,
    isWeiXin: isWeiXin,
    checkIdcard: checkIdcard,
    getBirthdatByIdNo: getBirthdatByIdNo,
    getSexByIdNo: getSexByIdNo,
    checkSlbh: checkSlbh,
    saveLocal: saveLocal,
    getLocal: getLocal,
    removeLocal: removeLocal,
    getLocalSaveTime: getLocalSaveTime,
    toJSON: toJSON
}
