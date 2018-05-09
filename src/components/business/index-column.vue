<template>
  <div class="index-div">
    <div class="span-index">
      <span>{{(currentIndex + 1)}}</span>
    </div>
    <div class="close-index">
      <a @click.prevent="deleteRow">
        <i class="el-icon-close"></i>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "indexcolumn",
  components: {},
  data() {
    return {};
  },
  props: {
    field: {
      type: String
    },
    index: {
      type: Number
    },
    pagingIndex: {
      type: Number
    }
  },
  computed: {
    currentIndex() {
      return this.index + this.pagingIndex;
    }
  },
  methods: {
    deleteRow() {
      this.$emit("on-value-delete", this.field, this.index);
    }
  }
};
</script>
<style lang="less" scoped>
.index-div {
  .span-index {
    color: #48b6ff;
    font-weight: bold;
  }
}
.index-div:hover .span-index {
  display: none;
}
.close-index i {
  cursor: pointer;
  color: red;
  font-weight: bold;
}
</style>