<!-- 左侧菜单栏 -->
<template>
  <el-scrollbar class="el-scrollbar">
    <el-menu mode="vertical" :show-timeout="200" router :default-active="$route.path" @open="resizeWidth" @close="resizeWidth" background-color="#fff" text-color="#304156" active-text-color="#409EFF">
      <sidebar-item :routes="permissionRouters"></sidebar-item>
    </el-menu>
  </el-scrollbar>
  <!-- <div class="scroll-container" :style="{width:width}" ref="scrollContainer">
    
  </div> -->
</template>

<script>
import { mapGetters } from "vuex";
import sidebarItem from "./sidebar-item";

export default {
  name: "sidebar",
  components: { sidebarItem },
  data() {
    return {
      top: 0,
      width: "200px"
    };
  },
  computed: {
    ...mapGetters(["permissionRouters"])
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.el-scrollbar {
  height: 100%;
  background-color: #fff;
}
</style>