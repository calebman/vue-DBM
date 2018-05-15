<template>
  <div class="table-body-cell">
    <el-date-picker v-show="inSelect" ref="rendercolumn" v-model="v" type="datetime" @change="changeValue" @blur="blur"></el-date-picker>
    <span v-show="!inSelect">{{coverValue}}</span>
  </div>
</template>
<script>
import renderColumnMinix from "./render-column-mixin";
export default {
  name: "datetimecolumn",
  components: {},
  mixins: [renderColumnMinix],
  data() {
    return {
      histroyValue: null
    };
  },
  props: {},
  computed: {
    coverValue() {
      return this.$moment(this.value).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {},
  mounted() {},
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
  .cell-text-edit-datetime {
    text-align: center;
    width: 100%;
    height: 32px;
    outline: none;
    border: 1px solid #ff7496;
  }
}
</style>