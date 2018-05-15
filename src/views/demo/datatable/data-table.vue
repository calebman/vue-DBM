<template>
  <div class="table">
    <div class="table-card">
      <div class="table-card-header">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="header-left">
              <i class="dbm d-icon-3501shuju"></i>
              {{table.tableName}} &nbsp;&nbsp;
              <el-tooltip content="导出表格数据" effect="light">
                <a @click.prevent="exportData">
                  <i class="dbm d-icon-download"></i>
                </a>
              </el-tooltip>
              &nbsp;&nbsp;
              <el-tooltip content="插入一条数据" effect="light">
                <a @click.prevent="insert">
                  <i class="dbm d-icon-27CIRCLE"></i>
                </a>
              </el-tooltip>
              &nbsp;&nbsp;
              <el-popover trigger="hover" width="100">
                <div v-for="(item,index) in columns" :key="index">
                  <el-checkbox v-if="item.visiable !== undefined" v-model="item.visiable" :disabled="item.visiable == true && visiableCount <= 1" :label="item.field"></el-checkbox>
                </div>
                <i slot="reference" class="dbm d-icon-icon_seelog_fill"></i>
              </el-popover>
              &nbsp;&nbsp;
              <el-tooltip :content="isOpenFilter?'关闭筛选':'开启筛选'" effect="light">
                <a @click.prevent="openFilter">
                  <i class="dbm d-icon-filter" :style="{color:isOpenFilter?'#6b6b6b':'#008b8b'}"></i>
                </a>
              </el-tooltip>
              &nbsp;&nbsp;
              <el-tooltip content="重新加载数据" effect="light">
                <a @click.prevent="refreshData">
                  <i class="dbm d-icon-8"></i>
                </a>
              </el-tooltip>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="header-right">
              <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" size="small" :pageIndex="pagination.pageCurrent" :pageSizeOption="titleRows" :pageSize="pagination.pageSize" :total="pagination.totalCount" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']">
              </v-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="table-card-content">
        <v-table ref="dataTable" :is-loading="isLoading" :is-filter="isOpenFilter" :error-content-height="minHeight" style="width:100%;" :min-height="minHeight" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff" :row-height="rowHeight" :cell-click-done="cellClickDone" :paging-index="(pagination.pageCurrent-1)*pagination.pageSize" :clearFilterFlag="clearFilterFlag" :dataFilterRules="dataFilterRules" @on-filter-change="onFilterChange"></v-table>
      </div>
    </div>
    <files-preview :fileValue="filePreview.rowData[filePreview.field]" :initIndex="filePreview.initIndex" :showPreview="filePreview.showPreview" @close="filePreviewClose" @delete="filePreviewDelete"></files-preview>
  </div>
</template>

<script>
import datatableMock from "./datatable_mock.js";
import datatableUtils from "@/utils/datatableUtils.js";
import VTable from "@/components/table/table";
import VPagination from "@/components/pagination/pagination.js";

import filesPreview from "@/components/business/files-preview.vue";
import IndexColumn from "@/components/business/index-column.vue";
import TextColumn from "@/components/business/text-column.vue";
import NumberColumn from "@/components/business/number-column.vue";
import FileColumn from "@/components/business/file-column.vue";
import DatetimeColumn from "@/components/business/datetime-column.vue";

export default {
  name: "datatable",
  components: {
    filesPreview,
    VTable,
    VPagination,
    IndexColumn,
    TextColumn,
    NumberColumn,
    FileColumn,
    DatetimeColumn
  },
  data() {
    return {
      isLoading: true,
      table: {
        cols: [],
        tableName: "",
        dataCount: 0
      },
      columns: [],
      tableData: [],
      pagination: {
        pageSize: 30,
        pageCurrent: 1,
        totalCount: 0
      },
      cellClickData: {
        index: -1,
        field: ""
      },
      filePreview: {
        rowData: {},
        rowIndex: 0,
        field: "",
        initIndex: 0,
        showPreview: false
      },
      filterParam: [],
      isOpenFilter: false,
      titleRows: [30, 60, 90],
      rowHeight: 35,
      minHeight: 300,
      clearFilterFlag: false,
      dataFilterRules: {}
    };
  },
  computed: {
    visiableCount() {
      let count = 0;
      for (let index in this.columns) {
        let column = this.columns[index];
        count +=
          column.visiable != undefined && column.visiable == true ? 1 : 0;
      }
      return count;
    }
  },
  methods: {
    initColumns() {
      let cols = this.table.cols;
      let resultColumns = [];
      let self = this;
      resultColumns.push({
        field: "dbm_custome_index_system",
        title: "#",
        width: 50,
        titleAlign: "center",
        columnAlign: "center",
        render: (h, params) =>
          h("div", [
            h(IndexColumn, {
              props: {
                field: params.field,
                index: params.index,
                pagingIndex:
                  (self.pagination.pageCurrent - 1) * self.pagination.pageSize
              },
              on: { "on-value-delete": self.deleteRow }
            })
          ])
      });
      let v = {};

      for (let index in cols) {
        v = cols[index];
        let generatorRender = function(component, h, params) {
          return (h, params) =>
            h("div", [
              h(component, {
                props: {
                  value: params.row[params.field],
                  field: params.field,
                  index: params.index,
                  cellClickData: self.cellClickData
                },
                on: {
                  "on-value-change"(field, rowIndex, value) {
                    self.onValueChange(rowIndex, params.row, field, value);
                  },
                  "on-value-cancel"(field, rowIndex) {
                    self.cancelSelect();
                  },
                  "file-preview"(fileItem, fileIndex) {
                    self.filePreviewOpen(params, fileItem, fileIndex);
                  },
                  "file-add"() {
                    self.fileAdd(params, index);
                  }
                }
              })
            ]);
        };
        let render = generatorRender(TextColumn);
        let width = 150;
        switch (v.dataType) {
          case "datetime":
            render = generatorRender(DatetimeColumn);
            width = 180;
            break;
          case "number":
          case "int":
          case "decimal":
            render = generatorRender(NumberColumn);
            break;
          case "text":
            render = generatorRender(FileColumn);
            width = 180;
            break;
          default:
            render = generatorRender(TextColumn);
            break;
        }
        resultColumns.push({
          field: v.columnName,
          title: v.columnName,
          dataType: v.dataType,
          width: width,
          titleAlign: "center",
          columnAlign: "center",
          render: render,
          isResize: true,
          visiable: true
        });
      }
      this.columns = resultColumns;
    },
    getData() {
      this.isLoading = true;
      let result = {};
      for (let cindex in this.columns) {
        let col = this.columns[cindex];
        if (!col.dataType) continue;
        if (col.title == col.field) continue;
        col.title = col.field;
        this.columns.splice(cindex, 1, col);
      }
      for (let pindex in this.filterParam) {
        for (let cindex in this.columns) {
          if (this.columns[cindex].field == this.filterParam[pindex].field) {
            let col = this.columns[cindex];
            let param = this.filterParam[pindex];
            col.title =
              param.field +
              " " +
              this.getRuleTitleFromType(col.dataType, param.type) +
              " " +
              param.value;
            this.columns.splice(cindex, 1, col);
          }
        }
      }

      result = datatableMock.mockData(this.table, this.pagination);
      this.tableData = result.tableData;
      if (result.pagination) {
        this.pagination = result.pagination;
      }
      if (this.$refs["dataTable"]) {
        this.$refs["dataTable"].resize();
      }
      this.isLoading = false;
    },
    onValueChange(rowIndex, rowData, field, newValue) {
      this.tableData[rowIndex][field] = newValue;
      this.cancelSelect();
      // 如果有误可使用以下代码回滚
      // this.tableData[rowIndex][field] = rowData[field];
    },
    cellClickDone(rowIndex, rowData, field) {
      this.cellClickData = {
        index: rowIndex,
        field: field
      };
    },
    pageChange(pageCuurent) {
      this.pagination.pageCurrent = pageCuurent;
      this.getData();
    },
    pageSizeChange(pageSize) {
      this.pagination.pageCurrent = 1;
      this.pagination.pageSize = pageSize;
      this.getData();
    },
    exportData() {
      alert("导出数据");
    },
    insert() {
      let cols = this.table.cols;
      let v;
      let rowData = {};
      for (let index in cols) {
        v = cols[index];
        switch (v.dataType) {
          case "datetime":
            rowData[v.columnName] = v.columnDefault
              ? v.columnDefault
              : this.$moment().format("YYYY-MM-DD HH:mm:ss");
            break;
          case "decimal":
            rowData[v.columnName] = v.columnDefault ? v.columnDefault : 0;
            break;
          case "text":
            rowData[v.columnName] = v.columnDefault ? v.columnDefault : "";
            break;
          default:
            rowData[v.columnName] = v.columnDefault ? v.columnDefault : "";
            break;
        }
      }
      this.tableData.splice(0, 0, rowData);
    },
    deleteRow(field, index) {
      this.tableData.splice(index, 1);
    },
    clearFilterParam() {
      this.clearFilterFlag = !this.clearFilterFlag;
    },
    openFilter() {
      if (this.isOpenFilter) {
        this.filterParam = [];
        this.getData();
      }
      this.isOpenFilter = !this.isOpenFilter;
    },
    refreshData() {
      this.getData();
    },
    cancelSelect() {
      this.cellClickData = {
        index: -1,
        field: ""
      };
    },
    filePreviewClose() {
      this.filePreview = {
        rowData: {},
        rowIndex: 0,
        field: "",
        initIndex: 0,
        showPreview: false
      };
    },
    filePreviewOpen(params, item, index) {
      this.filePreview = {
        showPreview: true,
        rowIndex: params.index,
        initIndex: index,
        rowData: params.row,
        field: params.field
      };
    },
    fileAdd(params, colIndex) {
      this.$message({
        message: `${params.index}行${colIndex}列的添加文件`,
        type: "success"
      });
      let fileValue = datatableUtils.covertFileColumnValue(
        this.tableData[params.index][params.field]
      );
      if (fileValue.root == "") {
        fileValue.root = datatableMock.fileRoot;
      }
      let filesArray = fileValue.files;
      filesArray.push(datatableMock.mockOneFileAddress());
      this.onValueChange(
        params.index,
        this.tableData[params.index][params.field],
        params.field,
        JSON.stringify({
          root: fileValue.root,
          files: filesArray
        })
      );
    },
    filePreviewDelete(deleteIndex) {
      let rowIndex = this.filePreview.rowIndex;
      let rowData = this.filePreview.rowData;
      let field = this.filePreview.field;
      let fileValue = datatableUtils.covertFileColumnValue(
        this.tableData[rowIndex][field]
      );
      let filesArray = fileValue.files;
      filesArray.splice(deleteIndex, 1);
      this.onValueChange(
        rowIndex,
        rowData,
        field,
        JSON.stringify({
          root: fileValue.root,
          files: filesArray
        })
      );
      this.filePreviewClose();
    },
    onFilterChange(filterParam) {
      this.filterParam = filterParam;
      this.getData();
    },
    getRuleTitleFromType(dataType, ruleName) {
      let dataRule;
      if (this.dataFilterRules[dataType])
        dataRule = this.dataFilterRules[dataType];
      else dataRule = this.dataFilterRules["varchar"];
      for (let index in dataRule)
        if (dataRule[index].name == ruleName) return dataRule[index].title;
    }
  },
  watch: {},
  created() {
    this.dataFilterRules = datatableUtils.dataFilterRule;
    let table = {
      tableName: "个人信息表",
      dataCount: 1205,
      cols: [
        {
          columnName: "姓名",
          columnKey: "",
          columnDefault: null,
          isNullable: "NO",
          dataType: "varchar"
        },
        {
          columnName: "昵称",
          columnKey: "",
          columnDefault: null,
          isNullable: "NO",
          dataType: "varchar"
        },
        {
          columnName: "家庭住址",
          columnKey: "",
          columnDefault: null,
          isNullable: "YES",
          dataType: "varchar"
        },
        {
          columnName: "出生年月",
          columnKey: "",
          columnDefault: null,
          isNullable: "YES",
          dataType: "datetime"
        },
        {
          columnName: "照骗",
          columnKey: "",
          columnDefault: null,
          isNullable: "YES",
          dataType: "text"
        },
        {
          columnName: "高考分数",
          columnKey: "",
          columnDefault: null,
          isNullable: "YES",
          dataType: "decimal"
        }
      ]
    };
    this.table = table;
    this.pagination.totalCount = table.dataCount;
    this.initColumns();
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.cell-edit-color {
  color: #2db7f5;
  font-weight: bold;
}
.table {
  height: 100%;
  .table-card {
    padding: 16px;
    height: 100%;
    border-radius: 5px;
    border-color: #b0b0b0;
    background-color: #fff;
    .table-card-header {
      position: relative;
      top: 0;
      width: 95%;
      .header-left {
        float: left;
        margin-left: 16px;
        i {
          color: #008b8b;
          font-size: 18px;
          cursor: pointer;
        }
      }
      .header-right {
        float: right;
        margin-right: 6px;
      }
    }
    .table-card-content {
      box-sizing: content-box;
      padding: 10px 0 0;
      font-size: 15px;
    }
  }
}
</style>