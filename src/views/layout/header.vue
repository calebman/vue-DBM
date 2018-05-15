<!-- 布局头部 -->
<template>
  <div class="layout-header">
    <el-row>
      <el-col :xs="10" :sm="12" :md="14" :lg="16" :xl="18">
        <div class="system-info">
          <img class="logo" src="@/assets/logo.png">
          <span class="title">Database Manager</span>
        </div>
      </el-col>
      <el-col v-if="isLogin" :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
        <div class="system-user">
          <div class="tools">
            <!-- <el-button icon="icon dbm d-icon-tongzhi"></el-button> -->
            <!-- <el-button>
              <el-badge is-dot class="item">
                <i class="icon dbm d-icon-tongzhi"></i>
              </el-badge>
            </el-button> -->
          </div>
          <el-dropdown @command="userCommand">
            <span class="userinfo-inner">
              <img :src="avatar" /> {{name}}
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
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "header",
  components: {},
  data() {
    return {};
  },
  props: {},
  computed: {
    ...mapGetters(["avatar", "name", "introduction", "isLogin"])
  },
  methods: {
    userCommand(command) {
      switch (command) {
        case "usercenter":
          break;
        case "logout":
          this.$store.dispatch("LogOut").then(() => location.reload());
          break;
      }
    }
  },
  watch: {},
  created() {}
};
</script>

<style lang="less" scoped>
.layout-header {
  position: absolute;
  width: 100%;
  background: #495060;
  line-height: 64px;
  height: 64px;
  top: 0;
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
    float: right;
    padding-right: 16px;
    .userinfo-inner {
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 10px 0px 10px 10px;
        float: right;
      }
    }
    .tools {
      float: left;
      padding-right: 16px;
    }
  }
}
</style>