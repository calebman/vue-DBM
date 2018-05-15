import Mock from 'mockjs';
import moment from 'moment';
function mockData(table, pagination) {
    let result = {
        tableData: [],
        pagination: {}
    };
    let rowCount = mockNumber(25, 100);
    if (pagination) {
        result.pagination = pagination;
        if (pagination.pageCurrent < Math.ceil(pagination.totalCount / pagination.pageSize)) {
            rowCount = pagination.pageSize;
        } else {
            rowCount = (pagination.totalCount % pagination.pageSize);
        }
    }
    for (let i = 0; i < rowCount; i++) {
        result.tableData.push(mockRowData(table.cols));
    }
    return result;
}
function mockRowData(cols) {
    let row = {};
    let v = {};
    for (let index in cols) {
        v = cols[index];
        switch (v.dataType) {
            case 'datetime':
                row[v.columnName] = mockDate();
                break;
            case 'decimal':
                row[v.columnName] = mockDecimal(1, 100);
                break;
            case 'text':
                row[v.columnName] = mockFile();
                break;
            default:
                row[v.columnName] = mockStr();
                break;
        }
    }
    return row;
}

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

const arr = ["image2.jpeg", "image3.jpeg", "image4.jpeg", "image5.jpeg", "image6.jpeg"];

// 随机数组一项
function mockOneFileAddress() {
    return Mock.mock({ 'oneFile|1': arr }).oneFile;
}

const fileRoot = "http://kingeid.nat100.top/info/Traffic/images";
function mockFile() {
    let fileCount = mockNumber(0, arr.length);
    let result = { root: fileRoot, files: [] };
    for (let i = 0; i < fileCount; i++) {
        result.files.push(mockOneFileAddress())
    }
    return JSON.stringify(result);
}


// 随机日期
function mockDate() {
    let mockDateStr = Mock.Random.datetime('yyyy-MM-dd HH:mm:ss');
    // 在这里使用了momentjs将其解析为Date类型
    let mockDate = moment(mockDateStr, 'YYYY-MM-DD HH:mm:ss').toDate();
    return mockDate;
}
export default {
    mockData: mockData,
    mockStr: mockStr,
    mockNumber: mockNumber,
    mockDecimal: mockDecimal,
    mockOneFileAddress: mockOneFileAddress,
    mockFile: mockFile,
    mockDate: mockDate,
    fileRoot: fileRoot,
    filesArr: arr
}