<!-- 系统登录页 -->
<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <div class="title">
      <h3>登录Database Manager</h3>
    </div>
    <el-form-item prop="username">
      <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
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
        password: "123456"
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },
  props: {},
  computed: {},
  methods: {
    handleSubmit(name) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.logining = true;
          this.$store
            .dispatch("login", this.ruleForm)
            .then(() => {
              this.dump();
            })
            .catch(err => {
              this.$message({ message: err, type: "error" });
            })
            .finally(e => {
              this.logining = false;
            });
        } else {
          return false;
        }
      });
    },
    autoLogin() {
      this.$store.dispatch("login").then(() => {
        this.dump();
      });
    },
    dump() {
      if (this.$route.query.routeName) {
        this.$router.replace({
          name: this.$route.query.routeName,
          query: this.$route.query
        });
      } else if (this.$route.query.routePath) {
        this.$router.replace({
          path: this.$route.query.routePath,
          query: this.$route.query
        });
      } else {
        this.$router.replace({ path: "/" });
      }
    }
  },
  watch: {},
  created() {
    this.autoLogin();
  }
};
</script>

<style scoped>
.login-container {
  position: absolute;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  width: 350px;
  height: 350px;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 0px 0px 35px 0px;
}
</style>