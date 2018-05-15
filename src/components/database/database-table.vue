<style lang="less" scoped>
.dragging-tip-enter-active {
  opacity: 1;
  transition: opacity 0.3s;
}
.dragging-tip-enter,
.dragging-tip-leave-to {
  opacity: 0;
  transition: opacity 0.3s;
}
.dragging-tip-con {
  display: block;
  text-align: center;
  width: 100%;
  height: 50px;
}
.dragging-tip-con span {
  font-size: 18px;
}
.record-tip-con {
  display: block;
  width: 100%;
  height: 292px;
  overflow: auto;
}
.record-item {
  box-sizing: content-box;
  display: block;
  overflow: hidden;
  height: 24px;
  line-height: 24px;
  padding: 8px 10px;
  border-bottom: 1px dashed gainsboro;
}
.record-tip-con span {
  font-size: 14px;
}
.edittable-test-con {
  height: 200px;
}
.console-con {
  text-align: center;
  height: 200px;
}
.edittable-table-height-con {
  height: 190px;
}
.edittable-con-1 {
  box-sizing: content-box;
  padding: 15px 0 0;
  height: 236px;
}
.edittable-table-get-currentdata-con {
  height: 190px !important;
}
.exportable-table-download-con1 {
  padding: 16px 0 16px 20px;
  border-bottom: 1px dashed #c3c3c3;
  margin-bottom: 16px;
}
.exportable-table-download-con2 {
  padding-left: 20px;
}
.show-image {
  padding: 20px 0px;
}
.show-image img {
  display: block;
  width: 100%;
  height: auto;
}
.searchable-table {
  &-con1 {
    height: 230px !important;
  }
}
.data-source-row {
  height: 200px;
}
.demo-spin-container {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px solid #eee;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
.refurbish {
  cursor: pointer;
}
.refurbish:hover {
  color: #20a0ff;
}
.load-more {
  text-align: center;
  margin: 0 auto;
  height: 30px;
}
.load-more-text {
  cursor: pointer;
  font-size: 18px;
}
.load-more-text:hover {
  color: #20a0ff;
}
</style>

<template>
  <div>
    <Row>
      <Col span="9">
      <Card>
        <p slot="title">
          <Col span="17">
          <Icon type="load-b"></Icon>
          简单说明
          </Col>
          <Col span="7">
          <CountTo :endVal="loadCount" :mainStyle="mainStyle" :countStyle="countStyle">
            <span slot="leftText">已加载&nbsp;</span>
            <span slot="rightText">&nbsp;个表格</span>
          </CountTo>
          </Col>
        </p>
        <div class="edittable-test-con">
          <Alert show-icon>
            <span slot="icon">
              <Icon type="ios-search" size="18"></Icon>
            </span>
            <span style="font-size: 15px">查看表格数据</span>
          </Alert>
          <Alert show-icon>
            <span slot="icon">
              <Icon type="ios-plus-empty" size="18"></Icon>
            </span>
            <span style="font-size: 15px">添加表格数据项</span>
          </Alert>
          <Alert show-icon type="warning">
            <span slot="icon">
              <Icon type="ios-close-empty" size="18"></Icon>
            </span>
            <span style="font-size: 15px">勾选时删除列，勾选为空时删除表</span>
          </Alert>
          <Alert show-icon>
            <span slot="icon">
              <Icon type="information-circled" size="17"></Icon>
            </span>
            <span style="font-size: 15px">编辑表格数据项</span>
          </Alert>
        </div>
      </Card>
      </Col>
      <Col span="10" class="padding-left-10">
      <Card>
        <div class="edittable-con-1">
          <template v-if="!spinShow">
            <table-data-pie :tableData="tableData"></table-data-pie>
          </template>
          <span v-if="spinShow" style="font-size: 18px;color: #7f8c8d;text-align:center;display:block;">图表加载中...</span>
        </div>
      </Card>
      </Col>
      <Col span="5" class="padding-left-10">
      <Card>
        <p slot="title">
          <Col span="12">
          <Icon type="navicon-round"></Icon>
          控制台
          </Col>
          <Col span="10">
          <CountTo :endVal="tableCount" :mainStyle="mainStyle" :countStyle="countStyle">
            <span slot="leftText">表格总数&nbsp;</span>
            <span slot="rightText">&nbsp;个</span>
          </CountTo>
          </Col>
          <Col span="2" class="refurbish">
          <Icon title="刷新表格" type="ios-loop-strong" size="18" @click.native="refurbish"></Icon>
          </Col>
        </p>
        <div class="console-con">
          <AutoComplete v-model="searchData" :data="tableNames" :filter-method="filterMethod" icon="ios-search" placeholder="筛选表格" style="width:75%;margin: 6px;">
          </AutoComplete>
          <xlxs-table style="width:75%;margin-top: 6px;" @on-select-file="importExcelFile">
          </xlxs-table>
        </div>
      </Card>
      </Col>
    </Row>
    <div class="demo-spin-container">
      <template v-if="!spinShow" v-for="(row, rowIndex) in tableList">
        <Row class="margin-top-10">
          <template v-for="(col, colIndex) in row">
            <Col :span="24/loadCountOfRow" v-if="colIndex %loadCountOfRow == 0">
            <table-card :table="col" @showTable="showTable" @editColumn="editColumn" @deleteColumn="deleteColumn"></table-card>
            </Col>
            <Col :span="24/loadCountOfRow" v-else class="padding-left-10">
            <table-card :table="col" @showTable="showTable" @editColumn="editColumn" @deleteColumn="deleteColumn"></table-card>
            </Col>
          </template>
        </Row>
      </template>
      <Spin fix v-if="spinShow">
        <Icon type="load-c" size=22 class="demo-spin-icon-load"></Icon>
        <div style="font-size: 16px">Loading</div>
      </Spin>
    </div>
    <div class="load-more" v-if="searchData == ''&&showTableData.length != tableData.length">
      <div class="load-more-text" @click="loadMore">
        <Icon type="ios-arrow-down" size="18"></Icon>
        <span>加载更多....</span>
      </div>
    </div>
  </div>
</template>

<script>
import databaseMock from "./data/database_mock.js";
import tableCard from "./components/table-card.vue";
import tableDataPie from "./components/table-data-pie.vue";
import xlxsTable from "./components/xlsx-table.vue";
import CountTo from "../my_components/CountTo.vue";
import util from '@/utils/util.js';
export default {
  name: "database-table",
  components: {
    tableCard,
    tableDataPie,
    xlxsTable,
    CountTo
  },
  data() {
    return {
      mainStyle: {
        fontSize: "15px"
      },
      countStyle: {
        fontSize: "18px",
        color: "#dc9387"
      },
      tableData: [],
      searchData: "",
      spinShow: true,
      loadCount: 0,
      eveyLoadCount: 9,
      loadCountOfRow: 3
    };
  },
  computed: {
    showTableData() {
      let loadShowData = [];
      let tableData = this.tableData;
      for (let index = 0; index < this.loadCount; index++) {
        loadShowData.push(tableData[index]);
      }
      return loadShowData;
    },
    tableList() {
      let list = [];
      let rowData = [];
      let tableData = [];
      if (this.searchData == "") tableData = this.showTableData;
      else tableData = this.tableData;
      for (let index in tableData) {
        if (tableData[index].tableName.indexOf(this.searchData) > -1)
          rowData.push(tableData[index]);
        if (rowData.length == this.loadCountOfRow) {
          list.push(rowData);
          rowData = [];
        }
      }
      if (rowData.length != 0) list.push(rowData);
      return list;
    },
    tableNames() {
      let names = [];
      let tableData = this.tableData;
      for (let index in tableData) {
        names.push(tableData[index].tableName);
      }
      return names;
    },
    tableCount() {
      return this.tableData.length;
    }
  },
  methods: {
    getData() {
      const msg = this.$Message.loading({
        content: "Loading...",
        duration: 0
      });
      this.tableData = [];
      this.loadCount = 0;
      let tableData = [];
      tableData = databaseMock.mockData();
      setTimeout(msg, 100);
      this.tableData = tableData;
      this.loadMore();
    },
    showTable(table) {
      util.openNewPage(this, "table_index");
      for (let index in table.cols) table.cols[index].show = true;
      this.$router.push({
        name: "table_index"
      });
    },
    deleteColumn(selectColumns, table) {
      let result = true;

      if (result) {
        if (selectColumns.length == 0) {
          for (let index in this.tableData)
            if (this.tableData[index].tableName == table.tableName) {
              this.loadCount--;
              this.tableData.splice(index, 1);
            }
        } else {
          let columns = table.cols;
          for (let index in selectColumns)
            for (let delIndex in columns)
              if (
                columns[delIndex].columnName == selectColumns[index].columnName
              )
                columns.splice(delIndex, 1);
        }
      } else this.$Message.error("存在冲突，操作失败");
    },
    editColumn(selectColumn, editColumnData, table) {
      let oldColumnData = JSON.parse(JSON.stringify(selectColumn));
      let newColumnData = editColumnData;
      let result = true;

      if (result) {
        if (selectColumn)
          for (let key in selectColumn) selectColumn[key] = editColumnData[key];
        else table.cols.splice(table.cols.length - 1, 0, editColumnData);
      } else this.$Message.error("存在冲突，操作失败");
    },
    filterMethod(value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
    importExcelFile(convertedData, file) {
      let result = true;

      if (result) {
        this.loadCount++;
        this.tableData.splice(0, 0, result);
      } else this.$Message.error("存在冲突，导入失败");
    },
    loadMore() {
      let loadIndex = this.showTableData.length;
      let loadDiff = this.tableData.length - loadIndex;
      this.loadCount +=
        loadDiff > this.eveyLoadCount ? this.eveyLoadCount : loadDiff;
      if (this.loadCount == this.tableData.length)
        this.$Message.success({
          content: "全部加载完毕",
          duration: 3
        });
    },
    refurbish() {
      this.spinShow = true;
      this.getData();
      this.spinShow = false;
    }
  },
  watch: {},
  created() {
    if (window.screen.width < 1400) this.loadCountOfRow = 2;
    this.getData();
    this.spinShow = false;
  }
};
</script>
