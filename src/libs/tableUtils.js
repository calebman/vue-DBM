var squel = require('squel');
var moment = require('moment');
let util = {

};
util.isFileColumn = function (str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (str.indexOf('{') > -1) {
                if (obj.dir && obj.files && Object.prototype.toString.call(obj.files) === '[object Array]')
                    return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }
    return false;
}
util.getDataFromTable = function (tableName, filterParam, pagination) {
    let sql = squel.select().from(tableName)
        .where(createFilter(tableName, filterParam));
    if (pagination) {
        sql.limit(pagination.pageSize).offset(((pagination.pageCurrent - 1) * pagination.pageSize));
    }
    return sql.toString();
}
util.updateDataFromTable = function (table, rowData, field, newValue) {
    if (newValue instanceof Date) newValue = moment(newValue).format('YYYY-MM-DD HH:mm:ss');
    let sql = squel.update().table(table.tableName).set(field, newValue).where(createExpr(table, rowData)).limit(1);
    return sql.toString();
}
util.insertDataFromTable = function (table, rowData) {
    let sql = squel.insert().into(table.tableName);
    for (let key in rowData) {
        let value = rowData[key];
        sql.set(key, value);
    }
    return sql.toString();
}
util.deleteDataFromTable = function (table, rowData) {
    let sql = squel.delete().from(table.tableName).where(createExpr(table, rowData)).limit(1).toString();
    return sql;
}
util.editTable = function (table, oldColumn, newColumn) {
    let sql = '';
    if (oldColumn) sql = createUpdateColumnSql(table, oldColumn, newColumn);
    else sql = createAddColumnSql(table, newColumn);
    return sql;
}
util.deleteTable = function (table, deleteColumns) {
    if (deleteColumns && deleteColumns.length > 0) {
        return createDeleteColumnSql(table, deleteColumns);
    } else return ('DROP TABLE ' + table.tableName);
}
util.changeTableName = function (oldTableName, newTableName) {
    return ('ALTER TABLE ' + oldTableName + ' RENAME TO ' + newTableName);
}
util.importTableFromExcel = function (tables, convertedData, fileName) {
    let importTable = getImportTable(tables, convertedData, fileName);
    return importTable;
}
util.getImportTableSql = function (createTable, convertedData) {
    let createTableSql = 'CREATE TABLE ' + createTable.tableName + '('
    for (let index in createTable.cols) {
        let col = createTable.cols[index];
        createTableSql += col.columnName + ' varchar(255) NULL ,';
    }
    createTableSql = createTableSql.substring(0, createTableSql.length - 1) + ')';
    let insertDataSql = squel.insert().into(createTable.tableName)
        .setFieldsRows(convertedData.body).toString()
    return {
        createTableSql: createTableSql,
        insertDataSql: insertDataSql
    };
}
util.hasFileColumn = function (cols) {
    let column = {};
    for (let index in cols) {
        column = cols[index];
        if (column['dataType'] == 'text')
            return true;
    }
    return false;
}
util.isDecimal = function (obj) {
    var reg = /^\d+(\.\d+)?$/;
    return reg.test(obj);
}
util.isDate = function (str) {
    var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
    return reg.test(str) && RegExp.$2 <= 12 && RegExp.$3 <= 31;
}
util.CheckIconExists = function (item) {
    let iconurl = 'static/local/suffix/' + this.getSuffix(item) + '.png';
    let returnUrl = 'static/local/suffix/empty.png';
    var xmlHttp;
    if (window.ActiveXObject)
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    else if (window.XMLHttpRequest)
        xmlHttp = new XMLHttpRequest();
    xmlHttp.open("Get", iconurl, false);
    xmlHttp.send();
    if (xmlHttp.status != 404)
        returnUrl = iconurl;
    return returnUrl;
}
util.getFileName = function (file) {
    if (file.indexOf('/') > -1)
        return file.substring(file.indexOf('/') + 1, file.length);
    if (file.indexOf('\\') > -1)
        return file.substring(file.indexOf('\\') + 1, file.length);
    return file;
}
util.getSuffix = function (fileName) {
    if (fileName.indexOf('.') < 0)
        return 'empty';
    return fileName.substring(fileName.indexOf('.') + 1, fileName.length).toLowerCase();
}
util.getImgPath = function (appPath, dir, item) {
    if (dir.indexOf("http://") > -1)
        return dir + '/' + item;
    return appPath + '/' + dir + '/' + item;
}
util.getDataFilterRules = function () {
    return dataFilterRule;
}
util.getRuleTitleFromType = function (dataType, ruleName) {
    let dataRule;
    if (dataFilterRule[dataType]) dataRule = dataFilterRule[dataType];
    else dataRule = dataFilterRule['varchar'];
    for (let index in dataRule)
        if (dataRule[index].name == ruleName)
            return dataRule[index].title;
}



function createFilter(tableName, filterParam) {
    let expr = squel.expr();
    let param = {};
    for (let index in filterParam) {
        param = filterParam[index];
        let value = param.value == '' ? '' : "'" + param.value + "'";
        let field = tableName + '.' + param.columnName;
        let exp = param.type;
        switch (param.type) {
            case 'IS NULL': exp = "IS NULL OR " + field + " = ''"; break;
            case 'IS NOT NULL': exp = "IS NOT NULL AND " + field + " != ''"; break;
            case 'LIKE': value = "'%" + param.value + "%'"; break;
            case 'NOT LIKE': value = "'%" + param.value + "%'"; break;
            case '>=': value = param.value; break;
            case '<=': value = param.value; break;
            default: break;
        }
        expr.and(field + ' ' + exp + ' ' + value);
    }
    return expr;
}
function createExpr(table, rowData) {
    let columnKeys = getPRIKeys(table.cols);
    let expr = squel.expr();
    if (columnKeys.length > 0) {
        for (let index in columnKeys) {
            let key = columnKeys[index];
            let value = rowData[key];
            if (value instanceof Date) value = moment(value).format('YYYY-MM-DD HH:mm:ss');
            if (value == null) expr.and(key + ' is NULL');
            else expr.and(key + ' = ?', value);
        }
    } else {
        for (let key in rowData) {
            let value = rowData[key];
            if (value instanceof Date) value = moment(value).format('YYYY-MM-DD HH:mm:ss');
            if (value == null) expr.and(key + ' is NULL');
            else expr.and(key + ' = ?', value);
        }
    }
    return expr;
}
function getPRIKeys(cols) {
    let columnKeys = [];
    for (let index in cols) {
        if (cols[index]['columnKey'] == 'PRI')
            columnKeys.push(cols[index]['columnName']);
    }
    return columnKeys;
}
function createDeleteColumnSql(table, deleteColumns) {
    let col = {};
    let sql = 'ALTER TABLE ' + table.tableName;
    for (let index in deleteColumns) {
        col = deleteColumns[index];
        sql += ' drop ' + col.columnName + ',';
    }
    sql = sql.substring(0, sql.length - 1);
    return sql;
}
function createAddColumnSql(table, column) {
    let sql = 'ALTER TABLE ' + table.tableName + ' ADD COLUMN ' + column.columnName + ' ';
    switch (column.dataType) {
        case 'varchar': sql += ' varchar(255) '; break;
        case 'decimal': sql += ' decimal(18,9) '; break;
        case 'text': sql += ' text '; break;
        case 'datetime': sql += ' datetime '; break;
    }
    switch (column.isNullable) {
        case 'YES': sql += ' NULL '; break;
        case 'NO': sql += ' NOT NULL '; break;
    }
    if (column.columnDefault != null)
        sql += ' DEFAULT' + column.columnDefault + ' ';
    if (column.columnKey == 'PRI') {
        if (havePRIKey(table))
            sql += ',\nDROP PRIMARY KEY ';
        let prikeys = [];
        for (let index in table.cols) {
            let col = table.cols[index];
            if (col.columnKey == 'PRI')
                prikeys.push(col.columnName);
        }
        sql += ',\nADD PRIMARY KEY ('
        for (let index in prikeys)
            sql = sql + prikeys[index] + ',';
        sql = sql + column.columnName + ')';
    }
    return sql;
}
function createUpdateColumnSql(table, oldColumn, newColumn) {
    let sql = 'ALTER TABLE ' + table.tableName;
    let isRename = oldColumn.columnName != newColumn.columnName;
    let isUpdatePRI = oldColumn.columnKey != newColumn.columnKey;
    if (isRename) sql += ' CHANGE COLUMN ' + oldColumn.columnName + ' ' + newColumn.columnName + ' ';
    else sql += ' MODIFY COLUMN ' + newColumn.columnName + ' ';
    switch (newColumn.dataType) {
        case 'varchar': sql += ' varchar(255) '; break;
        case 'decimal': sql += ' decimal(18,9) '; break;
        case 'text': sql += ' text '; break;
        case 'datetime': sql += ' datetime '; break;
    }
    switch (newColumn.isNullable) {
        case 'YES': sql += ' NULL '; break;
        case 'NO': sql += ' NOT NULL '; break;
    }
    sql += findColumnBeforeName(table.cols, oldColumn);
    if (isUpdatePRI) {
        if (havePRIKey(table))
            sql += ',\nDROP PRIMARY KEY ';
        if (newColumn.columnKey == 'PRI') {
            let prikeys = [];
            for (let index in table.cols) {
                let col = table.cols[index];
                if (col.columnKey == 'PRI')
                    prikeys.push(col.columnName);
            }
            sql += ',\nADD PRIMARY KEY ('
            for (let index in prikeys)
                sql = sql + prikeys[index] + ',';
            sql = sql + newColumn.columnName + ')';
        }
        else {
            let prikeys = [];
            for (let index in table.cols) {
                let col = table.cols[index];
                if (col.columnKey == 'PRI' && col.columnName != oldColumn.columnName)
                    prikeys.push(col.columnName);
            }
            sql += ',\nADD PRIMARY KEY ('
            for (let index in prikeys)
                sql = sql + prikeys[index] + ',';
            sql = sql.substring(0, sql.length - 1) + ')';
        }
    }
    return sql;
}
function havePRIKey(table) {
    for (let index in table.cols)
        if (table.cols[index].columnKey == 'PRI')
            return true;
    return false;
}
function findColumnBeforeName(cols, col) {
    for (let index in cols)
        if (JSON.stringify(cols[index]) == JSON.stringify(col))
            return index == 0 ? 'FIRST' : 'AFTER ' + cols[index - 1].columnName;
    return 'AFTER ' + cols[cols.length - 1].columnName;
}
function getImportTable(tables, convertedData, fileName) {
    let table = new Object();
    table.tableName = fileName;
    table.dataCount = convertedData.body.length;
    table.cols = [];
    for (let index in convertedData.header) {
        let col = new Object();
        col.columnName = convertedData.header[index];
        col.columnKey = '';
        col.dataType = 'varchar';
        col.isNullable = 'YES';
        col.columnDefault = null;
        table.cols.push(col);
    }
    let findIndex = -1;
    for (let index in tables)
        if (tables[index].tableName == table.tableName)
            findIndex = index;
    if (findIndex > -1) {
        let findTable = tables[findIndex];
        table.tableName = getDiffTableName(tables, findTable.tableName);
    }
    return table;
}
function getDiffTableName(tables, tableName, i) {
    let tableNameTemp = tableName;
    if (arguments.length == 2) {
        i = 0;
    }
    let isMatch = true;
    while (isMatch) {
        isMatch = false;
        for (let tableIndex in tables)
            if (tables[tableIndex].tableName == tableName)
                isMatch = true;
        if (isMatch) tableName = tableNameTemp + (++i);
    }
    return tableName;
}

let dataFilterRule = {
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
        { name: '=', title: '大于' },
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

export default util;