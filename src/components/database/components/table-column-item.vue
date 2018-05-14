<style lang="less" scoped>
.to-do-list-item-text {
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  cursor: pointer;
  height: 36px;

  .height-100 {
    height: 100%;
  }
  .infor-icon-row {
    color: #c8c8c8;
  }
}
.hasDid {
  text-decoration: line-through;
  color: gray;
  font-weight: 100;
}
</style>

<template>
  <Row class="to-do-list-item">
    <Col span="2" class="height-100">
    <Row type="flex" justify="center" align="middle" class="height-100">
      <Checkbox v-model="todoitem"></Checkbox>
    </Row>
    </Col>
    <Col span="18" class="height-100">
    <Row type="flex" justify="start" align="middle" class="height-100">
      <div style="overFlow-x: scroll ;">
        <p v-if="todoitem" class="to-do-list-item-text" @click="doItem">
          <Tag @click.native="doItem" :color="selectColor">{{column.columnName}}</Tag>
          <Tag @click.native="doItem" :color="selectColor">{{columnType}}</Tag>
          <Tag @click.native="doItem" v-if="column.isNullable == 'YES'" :color="selectColor">可空</Tag>
          <Tag @click.native="doItem" :color="selectColor" v-else>非空</Tag>
          <Tag @click.native="doItem" :color="selectColor" v-if="column.columnDefault != null">{{column.columnDefault}}</Tag>
          <Tag @click.native="doItem" v-else :color="selectColor">无默认值</Tag>
          <Tag @click.native="doItem" :color="selectColor" v-if="column.columnKey == 'PRI'">唯一</Tag>
        </p>
        <p v-else class="to-do-list-item-text" @click="doItem">
          <Tag @click.native="doItem">{{column.columnName}}</Tag>
          <Tag @click.native="doItem">{{columnType}}</Tag>
          <Tag @click.native="doItem" v-if="column.isNullable == 'YES'">可空</Tag>
          <Tag @click.native="doItem" color="red" v-else>非空</Tag>
          <Tag @click.native="doItem" color="blue" v-if="column.columnDefault != null">{{column.columnDefault}}</Tag>
          <Tag @click.native="doItem" v-else>无默认值</Tag>
          <Tag @click.native="doItem" color="red" v-if="column.columnKey == 'PRI'">唯一</Tag>
        </p>
      </div>
    </Row>
    </Col>
    <Col span="4" class="height-100" v-if="!todoitem">
    <Row type="flex" justify="center" align="middle" class="infor-icon-row height-100">
      <Icon style="cursor: pointer;" @click.native="changeColumn" type="information-circled" size="20"></Icon>
    </Row>
    </Col>
  </Row>
</template>

<script>
export default {
  name: "table-column-item",
  data() {
    return {
      todoitem: this.value,
      selectColor: "green"
    };
  },
  props: {
    column: {
      type: Object,
      default: () => {
        return {
          columnName: "default",
          dataType: "varchar",
          isNullable: "YES",
          columnDefault: null
        };
      }
    },
    value: Boolean
  },
  computed: {
    columnType() {
      switch (this.column.dataType) {
        case "decimal":
          return "数字类型";
        case "text":
          return "附件类型";
        case "datetime":
          return "时间类型";
        default:
          return "文本类型";
      }
    }
  },
  methods: {
    changeColumn() {
      this.$emit("editColumn", this.column);
    },
    doItem() {
      this.todoitem = !this.todoitem;
    }
  },
  watch: {
    todoitem(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.todoitem = val;
    }
  }
};
</script>