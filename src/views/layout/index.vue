<!-- 上中下布局 -->
<template>
  <div class="layout">
    <layout-header></layout-header>
    <layout-content>
      <sidebar slot="left"></sidebar>
      <router-view slot="content" v-loading="routerLoading"></router-view>
    </layout-content>
    <layuot-footer>
      <a class="footer-content" href="https://github.com/calebman/vue-DBM">
        点此进入代码仓库
      </a>
    </layuot-footer>
  </div>
</template>

<script>
import layoutHeader from "./header";
import layoutContent from "./content";
import layuotFooter from "./footer";
import sidebar from "./sidebar";
export default {
  name: "layout",
  components: {
    layoutHeader,
    layoutContent,
    layuotFooter,
    sidebar
  },
  data() {
    return {};
  },
  props: {},
  computed: {
    routerLoading() {
      return this.$store.getters.routerLoading;
    }
  },
  methods: {},
  watch: {},
  created() {}
};
</script>

<style lang="less">
.layout {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #f5f7f9;
  .footer-content {
    font-weight: 400;
    font-size: 15px;
    color: #1c86ee;
    text-decoration: none;
  }
}
</style>