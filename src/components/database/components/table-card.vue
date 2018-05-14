<style lang="less" scoped>
.iview-admin-draggable-list {
  height: 100%;
}
.iview-admin-draggable-list li {
  padding: 9px;
  border: 1px solid #e7ebee;
  border-radius: 3px;
  margin-bottom: 5px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}
.iview-admin-draggable-list li:hover {
  color: #87b4ee;
  border-color: #87b4ee;
  transition: all 0.2s;
}
.iview-admin-draggable-delete {
  height: 100%;
  position: absolute;
  right: -8px;
  top: 0px;
  display: none;
}
.iview-admin-draggable-list li:hover .iview-admin-draggable-delete {
  display: block;
}
.placeholder-style {
  display: block !important;
  color: transparent;
  border-style: dashed !important;
}
.delte-item-animation {
  opacity: 0;
  transition: all 0.2s;
}
.iview-admin-draggable-list {
  overflow: auto;
}
.to-do-item {
  padding: 2px;
}
.to-do-list-con {
  height: 160px;
  overflow: auto;
}
.mainStyle {
  font-size: 15px;
}
.countStyle {
  font-size: 18px;
  color: #dc9387;
}
</style>
<template>
    <Card>
        <p slot="title">
            <Row>
                <Col span="18">
                <Icon type="ios-analytics-outline"></Icon>
                {{table.tableName}} &nbsp;&nbsp;
                <a @click.prevent="showTable">
                    <Icon type="ios-search" size="18"></Icon>
                </a>
                &nbsp;&nbsp;
                <a @click.prevent="addColumn">
                    <Icon type="ios-plus-empty" size="20"></Icon>
                </a>
                &nbsp;&nbsp;
                <a @click.prevent="deleteColumn">
                    <Icon type="ios-close-empty" size="20" color="red"></Icon>
                </a>
                </Col>
                <Col span="6">
                <span class="mainStyle">共&nbsp;</span>
                <span class="countStyle">{{table.dataCount}}</span>
                <span class="mainStyle">&nbsp;行</span>
                </Col>

            </Row>
        </p>
        <div class="to-do-list-con">
            <div v-for="(item, index) in table.cols" :key="index" class="to-do-item">
                <table-column-item :column="item" v-model="item.isSelect" @editColumn="editColumn"></table-column-item>
            </div>
        </div>
        <Modal v-model="showChangeModel" :title="selectColumnData==null?'新增列':'编辑列'">
            <Row type="flex" justify="center">
                <Form ref="columnValidate" :model="columnValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="列名：" prop="columnName">
                        <Input v-model="columnValidate.columnName" placeholder="请输入列名"></Input>
                    </FormItem>
                    <FormItem label="类型：" prop="dataType">
                        <Select v-model="columnValidate.dataType" placeholder="请选择类型" @on-change="changeDataType">
                            <Option value="varchar">文本类型</Option>
                            <Option value="decimal">整数类型</Option>
                            <Option value="datetime">时间类型</Option>
                            <Option value="text">附件类型</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="是否可空：" prop="isNullable">
                        <RadioGroup v-model="columnValidate.isNullable">
                            <Radio label="YES">可空</Radio>
                            <Radio label="NO">非空</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="默认值：" prop="columnDefault">
                        <Input v-model="columnValidate.columnDefault" :disabled="defaultInputDisabled">
                        <Select :disabled="selectDisabled" v-model="haveDefaultValue" slot="prepend" style="width: 80px">
                            <Option value="no">无默认值</Option>
                            <Option value="yes">有默认值</Option>
                        </Select>
                        </Input>
                    </FormItem>
                    <FormItem label="唯一性：">
                        <i-switch v-model="isOnlyOneValue">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch>
                    </FormItem>
                </Form>
            </Row>
            <Row slot="footer">
                <Button type="text" @click="cancelModel">取消</Button>
                <Button type="primary" @click="confirmChange('columnValidate')">确定</Button>
            </Row>
        </Modal>
    </Card>
</template>

<script>
import CountTo from "../../my_components/CountTo.vue";
import VueContextMenu from "../../my_components/VueContextMenu.vue";
import TableColumnItem from "./table-column-item.vue";
import dbmUtil from "../../../libs/dbmUtil";
export default {
  name: "table-card",
  components: {
    CountTo,
    VueContextMenu,
    TableColumnItem
  },
  data() {
    return {
      columnValidate: {},
      ruleValidate: {
        columnName: [{ validator: validateColumnName, trigger: "blur" }],
        dataType: [
          { required: true, message: "类型不能为空", trigger: "blur" }
        ],
        columnDefault: [
          { validator: this.validateColumnDefault, trigger: "blur" }
        ]
      },
      showChangeModel: false,
      haveDefaultValue: "no",
      isOnlyOneValue: false,
      selectColumnData: null
    };
  },
  props: {
    table: {
      type: Object,
      default: () => {
        return {
          cols: [],
          tableName: "null",
          dataCount: 0
        };
      }
    }
  },
  computed: {
    defaultInputDisabled() {
      return this.columnValidate.columnDefault == null ? true : false;
    },
    selectColumnDatas() {
      let data = [];
      for (let index in this.table.cols) {
        if (this.table.cols[index].isSelect) data.push(this.table.cols[index]);
      }
      return data;
    },
    selectDisabled() {
      return this.columnValidate.dataType == "text";
    }
  },
  methods: {
    editColumn(column) {
      this.selectColumnData = column;
      this.columnValidate = JSON.parse(JSON.stringify(column));
      this.haveDefaultValue =
        this.columnValidate.columnDefault == null ? "no" : "yes";
      this.isOnlyOneValue = this.columnValidate.columnKey == "" ? false : true;
      this.showChangeModel = true;
    },
    addColumn() {
      this.selectColumnData = null;
      this.columnValidate = {
        columnName: "",
        columnKey: "",
        dataType: "",
        isNullable: "YES",
        columnDefault: null
      };
      this.haveDefaultValue =
        this.columnValidate.columnDefault == null ? "no" : "yes";
      this.isOnlyOneValue = this.columnValidate.columnKey == "" ? false : true;
      this.showChangeModel = true;
    },
    confirmChange(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.showChangeModel = false;
          this.$emit(
            "editColumn",
            this.selectColumnData,
            this.columnValidate,
            this.table
          );
        }
      });
    },
    cancelModel() {
      this.showChangeModel = false;
    },
    showTable() {
      this.$emit("showTable", this.table);
    },
    deleteColumn() {
      this.$emit("deleteColumn", this.selectColumnDatas, this.table);
    },
    changeDataType(dataType) {
      if (dataType == "text") this.haveDefaultValue = "no";
    },
    validateColumnDefault(rule, value, callback) {
      if (this.haveDefaultValue == "no") return callback();
      switch (this.columnValidate.dataType) {
        case "decimal":
          if (!dbmUtil.isDecimal(value))
            return callback(new Error("请输入数字"));
          break;
        case "datetime":
          if (!dbmUtil.isDate(value))
            return callback(new Error("格式应类似于XXXX-XX-XX"));
          break;
        case "text":
          if (value != null) return callback(new Error("不应该存在默认值"));
          break;
      }
      callback();
    }
  },
  watch: {
    haveDefaultValue(data) {
      if (data == "no") this.columnValidate.columnDefault = null;
      else {
        this.columnValidate.columnDefault = "";
      }
    },
    isOnlyOneValue(data) {
      if (data) {
        this.columnValidate.columnKey = "PRI";
        this.columnValidate.isNullable = "NO";
      } else {
        this.columnValidate.columnKey = "";
      }
    }
  }
};
var validateColumnName = function(rule, value, callback) {
  if (!value) return callback(new Error("列名不能为空"));
  var regEn = /[`~!@#$%^&*()+<>?:"{},.\/;'[\]]/im,
    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
  if (regEn.test(value) || regCn.test(value))
    return callback(new Error("列名不能包含特殊字符"));
  callback();
};
</script>