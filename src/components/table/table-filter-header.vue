<template>
  <div class="filter-header" v-if="column.dataType">
    <el-row>
      <el-col :xs="16" :sm="17" :md="18" :lg="19" :xl="20">
        <input class="filter-header-input" v-if="column.dataType == 'decimal'" @blur="createFilter" v-number-only :disabled="isDisabled" @keyup="enter($event)" v-model="inputNum" v-focus/>
        <el-date-picker class="filter-header-picker" v-else-if="column.dataType == 'datetime'" v-model="value" :type="dateType" :disabled="isDisabled" @change="createFilter"></el-date-picker>
        <input class="filter-header-input" v-else :disabled="isDisabled" v-focus @keyup="enter($event)" @blur="createFilter" v-model="value" />
      </el-col>
      <el-col :xs="8" :sm="7" :md="6" :lg="5" :xl="4">
        <div class="filter-icon">
          <el-dropdown @command="selectFilterType">
            <i class="dbm d-icon-filter1"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,index) in filterType" :key="index" :command="item.name">{{item.title}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
let num = 0;
export default {
  name: "filter-header",
  components: {},
  data() {
    return {
      selectType: "",
      value: "",
      filterOpt: {}
    };
  },
  props: {
    column: {
      type: Object,
      default: function() {
        return {
          dataType: "varchar"
        };
      }
    },
    clearFilterFlag: {
      type: Boolean,
      default: false
    },
    dataFilterRules: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    filterType() {
      for (let key in this.dataFilterRules)
        if (key == this.column.dataType) return this.dataFilterRules[key];
      return this.dataFilterRules["varchar"];
    },
    inputNum: {
      get: function() {
        return this.value;
      },
      set: function(newValue) {
        if (isNaN(newValue) && newValue.length == 1) newValue = num;
        if (newValue.length == 0) newValue = "";

        this.value = newValue.replace(/[^\d.]/g, "");
        num = this.value;
      }
    },
    isDisabled() {
      return this.selectType == "IS NULL" || this.selectType == "IS NOT NULL";
    },
    dateType() {
      let type = "date";
      if (this.selectType == "BETWEEN") {
        type = "daterange";
      }
      return type;
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    },
    numberOnly: {
      bind: function(el) {
        el.handler = function() {
          var val = el.value;
          el.value = val.replace(/[^\d.]/g, "");
        };
        el.addEventListener("input", el.handler);
      },
      unbind: function(el) {
        el.removeEventListener("input", el.handler);
      }
    }
  },
  methods: {
    selectFilterType(name) {
      this.selectType = name;
      this.createFilter();
    },
    enter(ev) {
      if (ev.keyCode == 13) this.createFilter();
    },
    createFilter() {
      if ((this.value == null || this.value == "") && !this.isDisabled) {
        this.$emit("on-filter-delete", this.column.field);
        return;
      }
      if (this.isDisabled) this.value = "";
      let filterOpt = {
        type: this.selectType,
        value: this.value
      };
      if (JSON.stringify(this.filterOpt) == JSON.stringify(filterOpt)) return;
      this.filterOpt = JSON.parse(JSON.stringify(filterOpt));
      filterOpt.field = this.column.field;
      this.$emit("on-filter-change", filterOpt);
    },
    clearFilter() {
      this.value = "";
      this.$emit("on-filter-delete", this.column.field);
    }
  },
  watch: {
    clearFilterFlag(val) {
      this.clearFilter();
    }
  },
  created() {
    if (this.filterType.length > 0) this.selectType = this.filterType[0].name;
  }
};
</script>
<style lang="less">
.filter-header {
  background-color: #dbdbdb;
  width: 100%;
  display: inline-block;
  padding: 0 3px;
  vertical-align: middle;
  word-break: break-all;
  overflow: hidden;
  line-height: 1.2em;
  .filter-header-input {
    text-align: center;
    padding-left: 17%;
    left: 30px;
    width: 100%;
    height: 32px;
    outline: none;
    margin: 3px;
    font-size: 16px;
    color: rgba(16, 11, 19, 0.93);
    border: 1px solid rgba(221, 222, 225, 0.78);
  }
  .filter-header-picker {
    text-align: center;
    margin: 3px;
    font-size: 16px;
  }
  .filter-icon {
    height: 100%;
    width: 100%;
    padding: 10px 0 0 0;
    i {
      font-size: 30px;
      color: black;
      cursor: pointer;
    }
  }
}
</style>