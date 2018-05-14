<!-- 系统登录页 -->
<template>
  <div class="login-page">
    <div class="page-center">
      <div class="info">
        <div class="title">
          <img src="@/assets/logo-blue.png">
          <span>Database Manager</span>
        </div>
        <div class="detail">
          <span>
            Database Manager 助您更好的管理关系型数据
          </span>
        </div>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <div class="title">
          <h3>账号密码登录</h3>
        </div>
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="admin/watcher">
            <i slot="prefix" class="dbm d-icon-username"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="admin/watcher">
            <i slot="prefix" class="dbm d-icon-password"></i>
          </el-input>
        </el-form-item>
        <el-checkbox v-model="isAutoLogin" checked class="remember">自动登录</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-footer">
      <a href="https://github.com/calebman/vue-DBM">
        点此进入代码仓库
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      logining: false,
      ruleForm: {
        username: "admin",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      isAutoLogin: true
    };
  },
  props: {},
  computed: {},
  methods: {
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.logining = true;
          this.$store
            .dispatch("LoginByUsername", this.ruleForm)
            .then(() => this.dump())
            .catch(() => (this.logining = false));
        }
      });
    },
    dump() {
      // if (this.$route.query.routeName) {
      //   this.$router.replace({
      //     name: this.$route.query.routeName,
      //     query: this.$route.query
      //   });
      // } else if (this.$route.query.routePath) {
      //   this.$router.replace({
      //     path: this.$route.query.routePath,
      //     query: this.$route.query
      //   });
      // } else {
      //   this.$router.replace({ path: "/" });
      // }
      this.$router.replace({ path: "/" });
    }
  },
  watch: {},
  created() {}
};
</script>

<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-image: url(../assets/login-back.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  .page-center {
    position: absolute;
    width: 400px;
    height: 540px;
    margin: auto;
    top: 112px;
    right: 0;
    left: 0;
    .info {
      text-align: center;
      height: 120px;
      .title {
        display: flex;
        justify-content: center;
        align-items: Center;
        font-size: 32px;
        color: rgba(0, 0, 0, 0.85);
        font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica,
          sans-serif;
        font-weight: 600;
        img {
          padding-bottom: 3px;
        }
      }
      .detail {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }

    .login-container {
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      padding: 35px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
      }
      .remember {
        margin: 0px 0px 35px 0px;
      }
    }
  }
}
.login-footer {
  position: absolute;
  width: 100%;
  margin: auto;
  bottom: 0;
  right: 0;
  left: 0;
  height: 50px;
  text-align: center;
  font-size: 15px;
  line-height: 50px;
  a {
    font-weight: 400;
    color: #1c86ee;
    text-decoration: none;
  }
}
</style>