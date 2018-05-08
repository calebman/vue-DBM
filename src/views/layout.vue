<!-- 核心布局 -->
<template>
  <div class="layout">
    <div class="layout-header">
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
    <div class="layout-main">
      <router-view/>
    </div>
    <div class="layout-footer">
      <a href="https://github.com/calebman/vue-DBM">
        点此进入代码仓库
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "layout1",
  components: {},
  data() {
    return {};
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
  created() {}
};
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #f5f7f9;
  .layout-header,
  .layout-main,
  .layout-footer {
    position: absolute;
    width: 100%;
  }
  .layout-header {
    background: #495060;
    line-height: 64px;
    height: 64px;
    top: 0;
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
      margin-right: 16px;
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
    height: 50px;
    text-align: center;
    font-size: 15px;
    line-height: 50px;
    bottom: 0;
    a {
      color: #303133;
      font-weight: 400;
    }
  }
  .layout-main {
    background-color: #fafafa;
    top: 64px;
    bottom: 50px;
    height: auto;
  }
}
</style>