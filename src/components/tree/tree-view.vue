<!-- 递归树组件 -->
<template>
  <div class="tree-view-menu">
    <div class="loading" v-if="isLoading">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
        <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
          <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite" />
        </path>
      </svg>
      <span>正在加载数据，请稍后</span>
    </div>
    <tree-view-item v-else :parent="value" :icon="icon" :asyncLoadData="asyncLoadData" level="0" :nodeClick="nodeClick"></tree-view-item>
  </div>
</template>

<script>
import treeViewItem from "./tree-view-item";
export default {
  name: "tree-view",
  components: {
    treeViewItem
  },
  data() {
    return {};
  },
  props: {
    value: Array,
    icon: Array,
    isLoading: Boolean,
    asyncLoadData: Function,
    nodeClick: Function
  },
  computed: {},
  methods: {},
  watch: {},
  created() {}
};
</script>

<style scoped>
.tree-view-menu {
  width: 300px;
  min-height: 300px;
  /* height: 100%; */
  overflow-y: auto;
  overflow-x: hidden;
}
.tree-view-menu .loading {
  height: 100%;
  width: 100%;
  text-align: center;
}
.loading svg {
  margin-top: 100px;
}
.loading span {
  margin-top: 10px;
  display: block;
  font-size: 16px;
}
.tree-view-menu::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.tree-view-menu::-webkit-scrollbar-trac {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.tree-view-menu::-webkit-scrollbar-thumb {
  background-color: #6e6e6e;
  outline: 1px solid #333;
}
.tree-view-menu::-webkit-scrollbar {
  height: 4px;
  width: 4px;
}
.tree-view-menu::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.tree-view-menu::-webkit-scrollbar-thumb {
  background-color: #6e6e6e;
  outline: 1px solid #708090;
}
</style>