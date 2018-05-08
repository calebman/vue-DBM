<!-- 主页面 -->
<template>
  <div class="layout">
    <div ref="mainheader" class="layout-header">
      <el-row>
        <el-col :xs="10" :sm="12" :md="14" :lg="16" :xl="18">
          <div class="system-info">
            <img class="logo" src="@/assets/logo.png">
            <span class="title">Database Manager</span>
          </div>
        </el-col>
        <el-col :xs="8" :sm="7" :md="6" :lg="5" :xl="4">
          <div v-if="isLogin" class="system-tools">
            <i class="icon dbm d-icon-tongzhi"></i>
          </div>
        </el-col>
        <el-col :xs="6" :sm="5" :md="4" :lg="3" :xl="2">
          <div v-if="isLogin" class="system-user">
            <el-dropdown @command="userCommand">
              <span class="userinfo-inner">
                <img :src="userInfo.avator" /> {{userInfo.name}}
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="usercenter">个人中心</el-dropdown-item>
                <el-dropdown-item divided command="logout">注销登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>
    <div :style="{height:contentHeight}" class="layout-main">
      <router-view/>
    </div>
    <div ref="mainfooter" class="layout-footer">
      <a href="https://github.com/calebman/vue-DBM">
        点此进入代码仓库
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "dbm-main",
  components: {},
  data() {
    return {
      contentHeight: "100px"
    };
  },
  props: {},
  computed: {
    title() {
      if (this.$route.meta && this.$route.meta.title) {
        return ` —— ${this.$route.meta.title}`;
      }
      return ``;
    },
    userInfo() {
      return this.$store.getters.userInfo;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    }
  },
  methods: {
    computeContentHeight() {
      let headerHeight = this.$refs["mainheader"]
        ? this.$refs["mainheader"].offsetHeight
        : null;
      headerHeight = headerHeight ? headerHeight : 65;
      let footerHeight = this.$refs["mainfooter"]
        ? this.$refs["mainfooter"].offsetHeight
        : null;
      footerHeight = footerHeight ? footerHeight : 60;
      return `${window.innerHeight - (headerHeight + footerHeight + 5)}px`;
    },
    userCommand(command) {
      switch (command) {
        case "usercenter":
          break;
        case "logout":
          break;
      }
    }
  },
  watch: {},
  mounted() {
    let self = this;
    self.contentHeight = self.computeContentHeight();
    window.onresize = function() {
      self.contentHeight = self.computeContentHeight();
    };
  },
  created() {}
};
</script>

<style lang="less" scoped>
.layout {
  // border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  // border-radius: 4px;
  overflow: hidden;
}

.layout-header {
  background: #495060;
  width: 100%;
  height: 100%;
  line-height: 64px;
  .system-tools {
    text-align: right;
    .d-icon-tongzhi {
      font-size: 24px;
      color: #fff;
      cursor: pointer;
    }
  }
  .system-info {
    text-align: left;
    .logo {
      width: 40px;
      height: 40px;
      border-radius: 50px;
      margin-top: 12px;
      margin-left: 20px;
      margin-right: 10px;
      float: left;
      position: relative;
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      color: azure;
      line-height: 64px;
    }
  }
  .system-user {
    text-align: right;
    margin-right: 5px;
    .userinfo-inner {
      cursor: pointer;
      color: #fff;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 10px 0px 10px 10px;
        float: right;
      }
    }
  }
}

.layout-footer {
  background-color: #fafafa;
  text-align: center;
  font-size: 15px;
  height: 50px;
  line-height: 50px;
  width: 100%;
  a {
    color: #303133;
    font-weight: 400;
  }
}

.layout-main {
  width: 100%;
  background-color: #fafafa;
  // position: relative;
  // overflow: scroll;
  // overflow-x: hidden;
}
</style>