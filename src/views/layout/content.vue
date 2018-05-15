<!-- 中间主要布局 -->
<template>
  <div class="layout-content">
    <div class="container">
      <div class="container-left">
        <slot name="left"></slot>
      </div>
      <div class="container-right">
        <div class="top">
          <i class="icon dbm d-icon-liebiao"></i>
          <el-breadcrumb class="breadcrumb" separator="/">
            <el-breadcrumb-item v-for="(item,index) in breadcrumbItems" :key="index" :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content" v-loading="routerLoading">
          <!-- <el-scrollbar style="height:100%">
            <slot name="content"></slot>
          </el-scrollbar> -->
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "content",
  components: {},
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
      let breadcrumbItems = [{ path: "/", title: "数据管理系统" }];
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
    $route(to) {
      this.initBreadcrumbItems(to);
    }
  },
  created() {
    this.initBreadcrumbItems(this.$route);
  }
};
</script>

<style lang="less" scoped>
.layout-content {
  position: absolute;
  width: 100%;
  background-color: #fafafa;
  top: 64px;
  bottom: 50px;
  height: auto;
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex; /*设为伸缩容器*/
    .container-left {
      width: 200px;
      height: 100%;
      text-align: left;
    }
    .container-right {
      flex: 1;
      width: 100%;
      height: 100%;
      background-color: #fff;
      position: relative;
      .top {
        float: left;
        padding-left: 16px;
        width: 100%;
        height: 50px;
        line-height: 50px;
        border-right: none;
        border-bottom: 1px solid #e6e6e6;
        border-left: 1px solid #e6e6e6;
        i {
          float: left;
          font-size: 20px;
          cursor: pointer;
        }
        .breadcrumb {
          padding-top: 18px;
          padding-left: 16px;
          float: left;
        }
      }
      .content {
        overflow-y: auto;
        width: 100%;
        position: absolute;
        top: 50px;
        bottom: 0px;
        left: 0px;
        border-left: 1px solid #e6e6e6;
      }
    }
  }
}
</style>