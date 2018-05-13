<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  watch: {
    // 请求过程中出现登录状态改变则跳转登录页面
    "$store.getters.isLogin"(val) {
      // 如果当前路由 需要认证、登录状态不对且不是登录页 则跳转登录页
      if (!this.$route.meta.notAuth && !val && this.$route.path != "/") {
        this.$route.query.routePath = this.$route.path;
        this.$router.replace({ path: "/login", query: this.$route.query });
      }
    }
  },
  mounted() {
    if (document.getElementById("dbm-loading")) {
      document.body.removeChild(document.getElementById("dbm-loading"));
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
body {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}
</style>
