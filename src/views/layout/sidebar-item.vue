<!-- 左侧菜单栏子项 -->
<template>
  <div class="sidebar">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">

      <el-menu-item v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :index="item.path+'/'+item.children[0].path">
        <i v-if="item.children[0].meta&&item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
        <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
      </el-menu-item>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <i v-if="item.meta&&item.meta.icon" :class="item.meta.icon"></i>
          <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <el-menu-item :index="item.path+'/'+child.path">
            <i v-if="child.meta&&child.meta.icon" :class="child.meta.icon"></i>
            <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: "sidebarItem",
  props: {
    routes: {
      type: Array
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden;
      });
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    }
  }
};
</script>
<style lang="less">
.sidebar i {
  font-size: 18px;
}
</style>
