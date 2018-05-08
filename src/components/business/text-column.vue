<template>
  <div class="table-body-cell">
    <input class="cell-text-edit-input" v-show="inSelect" ref="rendercolumn" @blur="blur" @keyup="enter($event)" v-model="v" />
    <span v-show="!inSelect" class="cell-text">{{v}}</span>
  </div>
</template>
<script>
import renderColumnMinix from "./render-column-mixin";
export default {
  name: "textcolumn",
  components: {},
  mixins: [renderColumnMinix],
  data() {
    return {};
  },
  props: {},
  computed: {},
  methods: {
    enter(ev) {
      if (ev.keyCode == 13) {
        this.changeValue(this.v);
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