<template>
  <scrollbar>
    <el-menu mode="vertical" :show-timeout="200" router :default-active="$route.path" background-color="#fff" text-color="#304156" active-text-color="#409EFF">
      <sidebar-item :routes="permissionRouters"></sidebar-item>
    </el-menu>
  </scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import sidebarItem from "./sidebar-item";
import scrollbar from "./scrollbar";

export default {
  name: "sidebar",
  components: { sidebarItem, scrollbar },
  computed: {
    ...mapGetters(["permissionRouters"])
  }
};
</script>
