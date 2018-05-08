<!-- 主页 -->
<template>
  <div class="container">
    <div class="container-left">
      <el-menu default-active="1-4-1" class="menu" :collapse="isCollapse" router>
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
      isCollapse: false,
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
  created() {
    this.initBreadcrumbItems(this.$route);
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex; /*设为伸缩容器*/
}
.container-left {
  /* float: left; */
  width: 240px;
  height: 100%;
}
.menu {
  text-align: left;
  height: 100%;
  padding: 16px;
}
.container-right {
  flex: 1;
  margin-top: 16px;
  margin-left: 16px;
}
.breadcrumb {
  padding-left: 10px;
}
.content {
  margin-top: 16px;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>