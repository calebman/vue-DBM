<!-- 递归树组件示例 -->
<template>
  <div class="tree">
    <div class="float">
      <p>异步加载</p>
      <tree-view :isLoading="asyncTreeLoading" :value="asyncTreeData" :icon="deepIcon" :nodeClick="nodeClick" :asyncLoadData="asyncLoadData"></tree-view>
    </div>
    <div class="float">
      <p>一次性加载</p>
      <tree-view :isLoading="syncTreeLoading" :value="syncTreeData" :icon="deepIcon" :nodeClick="nodeClick"></tree-view>
    </div>
  </div>
</template>

<script>
import treeView from "../../components/tree/tree-view";
export default {
  name: "tree-view-demo",
  components: {
    treeView
  },
  data() {
    return {
      deep: 10,
      count: 5,
      syncTreeLoading: false,
      syncTreeData: [],
      asyncTreeLoading: false,
      asyncTreeData: [],
      asyncId: 1,
      deepIcon: ["help", "gear-a", "edit", "refresh"]
    };
  },
  props: {},
  computed: {},
  methods: {
    generator(tree, parent, index) {
      if (index === undefined || index === 0) {
        index = 1;
      } else {
        index = index + 1;
      }
      if (index > this.deep) {
        return tree;
      }
      if (!parent) {
        parent = tree;
      }
      for (let i in parent) {
        if (!parent[i].children) {
          parent[i].children = [];
        }
        for (let j = 0; j < this.count; j++) {
          let id = index * this.count + j;
          parent[i].children.push({
            id: id,
            name: `测试测试文字${index}-${i}-${j}`
          });
        }
        return this.generator(tree, parent[i].children, index);
      }
    },
    nodeClick(node, parent) {
      console.log(node);
    },
    asyncLoadData(node, callback) {
      let self = this;
      setTimeout(() => {
        const data = [
          {
            id: ++self.asyncId,
            name: `测试子项${self.asyncId}`,
            children: []
          },
          {
            id: ++self.asyncId,
            name: `测试子项${self.asyncId}`,
            children: []
          }
        ];
        callback(data);
      }, 400);
    }
  },
  watch: {},
  created() {
    let self = this;
    self.syncTreeLoading = true;
    self.asyncTreeLoading = true;
    setTimeout(() => {
      self.syncTreeLoading = false;
      self.syncTreeData = this.generator([{ id: 1, name: "测测试试文字" }]);
    }, 1200);
    setTimeout(() => {
      self.asyncTreeLoading = false;
      self.asyncTreeData = [{ id: this.asyncId, name: "测测试试文字" }];
    }, 400);
  }
};
</script>

<style scoped>
.tree {
  width: 100%;
  height: 100%;
}
.tree p {
  font-size: 16px;
  color: black;
  font-weight: bold;
  text-align: center;
}
.tree .float {
  float: left;
  width: 360px;
  height: 100%;
  text-align: left;
  margin-right: 10px;
  background: #fff;
}
</style>