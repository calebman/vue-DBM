<template>
  <div class="table-body-cell">
    <input class="cell-text-edit-input" v-show="inSelect" ref="rendercolumn" @blur="blur" @keyup="enter($event)" v-model="inputNum" v-number-only />
    <span v-show="!inSelect" class="cell-text">{{inputNum}}</span>
  </div>
</template>
<script>
import renderColumnMinix from "./render-column-mixin";
export default {
  name: "numbercolumn",
  components: {},
  mixins: [renderColumnMinix],
  data() {
    return {
      historyNum: 0
    };
  },
  props: {},
  computed: {
    inputNum: {
      get: function() {
        return this.v;
      },
      set: function(newValue) {
        if (isNaN(newValue) && newValue.length == 1) {
          newValue = this.historyNum;
        }
        if (newValue.length == 0) {
          newValue = "0";
        }
        this.v = newValue.replace(/[^\d.]/g, "");
        this.historyNum = this.v;
      }
    }
  },
  directives: {
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
    enter(ev) {
      if (ev.keyCode == 13) {
        this.changeValue(this.inputNum);
      }
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.table-body-cell {
  padding: 0 2px;
  margin: 0;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  .cell-text-edit-input {
    text-align: center;
    width: 100%;
    height: 32px;
    outline: none;
    border: 1px solid #409EFF;
  }
  .cell-text-edit-input:focus {
    border: 1px solid #409EFF;
  }
}
</style>