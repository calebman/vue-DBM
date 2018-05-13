<!-- 元素级别的权限控制 -->
<template>
  <div class="content">
    <span>使用自定义的 v-permission 指令进行元素级别的权限控制</span>
    <el-button size="large" v-permission="['admin']">admin 可见</el-button>
    <el-button size="large" v-permission="['admin','watcher']">watcher 可见</el-button>
    <el-button size="large">未设置权限</el-button>
  </div>
</template>

<script>
import permission from "@/directive/permission/index.js";
export default {
  name: "element-permission",
  directives: {
    permission
  },
  components: {},
  data() {
    return {};
  },
  props: {},
  computed: {},
  methods: {},
  watch: {},
  created() {}
};
</script>

<style scoped>
.content {
  width: 100%;
  margin: 0 auto;
  margin-top: 150px;
}
.content span {
  margin-top: 20px;
  margin-bottom: 20px;
  display: block;
}
</style>