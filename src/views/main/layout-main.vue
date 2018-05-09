<!-- 主页 -->
<template>
  <div class="container">
    <div class="container-left">
      <sidebar></sidebar>
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
import sidebar from "./sidebar";
export default {
  name: "layoutMain",
  components: {
    sidebar
  },
  data() {
    return {
      breadcrumbItems: []
    };
  },
  props: {},
  computed: {
    routerLoading() {
      return this.$store.getters.routerLoading;
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
    text-align: left;
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