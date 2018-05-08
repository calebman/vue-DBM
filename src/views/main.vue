<!-- 主页 -->
<template>
  <div class="container">
    <div class="container-left">
      <el-menu default-active="1-4-1" class="menu" :defaultOpeneds="defaultOpeneds" router>
        <el-submenu v-for="(menuItem,menuIndex) in appMenu" :key="menuIndex" :index="menuIndex">
          <template slot="title">
            <i v-if="menuItem.icon" :class="menuItem.icon"></i>
            <span slot="title">{{menuItem.title}}</span>
          </template>
          <el-menu-item v-for="(item,index) in menuItem.children" :key="index" :index="item.path">
            <i v-if="item.icon" :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="container-center"></div>
    <div class="container-right">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item,index) in breadcrumbItems" :key="index" :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content" v-loading="routerLoading">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      defaultOpeneds: [],
      breadcrumbItems: []
    };
  },
  props: {},
  computed: {
    routerLoading() {
      return this.$store.getters.routerLoading;
    },
    appMenu() {
      return this.$store.getters.appMenu;
    }
  },
  methods: {
    initBreadcrumbItems(router) {
      let breadcrumbItems = [];
      for (let index in router.matched) {
        if (router.matched[index].meta && router.matched[index].meta.title) {
          breadcrumbItems.push({
            path: router.matched[index].path ? router.matched[index].path : "/",
            title: router.matched[index].meta.title
          });
        }
      }
      if (breadcrumbItems.length > 0) {
        breadcrumbItems[breadcrumbItems.length - 1].path = "";
      }
      this.breadcrumbItems = breadcrumbItems;
    }
  },
  watch: {
    $route(to, from) {
      this.initBreadcrumbItems(to);
    }
  },
  mounted() {},
  created() {
    this.initBreadcrumbItems(this.$route);
    if (Array.isArray(this.appMenu) && this.appMenu.length > 0) {
      // 默认展开第一项菜单的子项
      this.defaultOpeneds = [0];
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex; /*设为伸缩容器*/
  .container-left {
    width: 240px;
    height: 100%;
    .menu {
      text-align: left;
      height: 100%;
      padding: 16px;
    }
  }
  .container-center {
    width: 16px;
    height: 100%;
  }
  .container-right {
    flex: 1;
    padding-top: 16px;
    width: 100%;
    height: 100%;
    position: relative;
    .breadcrumb {
      padding-left: 10px;
      width: 100%;
      height: 20px;
    }
    .content {
      background-color: #fff;
      overflow: auto;
      width: 100%;
      position: absolute;
      top: 50px;
      bottom: 0px;
      left: 0px;
    }
  }
}
</style>