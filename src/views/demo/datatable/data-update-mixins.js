import datatableMock from "./datatable_mock.js";
import datatableUtils from "@/utils/datatableUtils.js";

export default {
  data() {
    return {
      filterParam: [],
      isOpenFilter: false,
      clearFilterFlag: false,
      dataFilterRules: {}
    };
  },
  methods: {
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
    getRuleTitleFromType(dataType, ruleName) {
      let dataRule;
      if (this.dataFilterRules[dataType]) {
        dataRule = this.dataFilterRules[dataType];
      } else {
        dataRule = this.dataFilterRules["varchar"];
      }
      for (let index in dataRule) {
        if (dataRule[index].name == ruleName) {
          return dataRule[index].title;
        }
      }
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
    refreshData() {
      this.getData();
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
    onFilterChange(filterParam) {
      this.filterParam = filterParam;
      this.getData();
    },
    onValueChange(rowIndex, row, field, newValue) {
      const historyValue = row[field];
      this.$set(row, field, newValue);
      this.cancelSelect();
      // 如果有误可使用以下代码回滚 注意需要在更新后调用
      // this.rollbackValue(row, field, historyValue);
    },
    rollbackValue(row, field, historyValue) { // 由于直接回滚将不触发视图更新 这里暂时使用hack的方式实现
      let self = this;
      setTimeout(function () {
        self.$set(row, field, historyValue);
      }, 100);
    }
  },
  created() {
    this.dataFilterRules = datatableUtils.dataFilterRule;
  }
}