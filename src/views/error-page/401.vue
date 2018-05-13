<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <div class="container">
          <span class="warn">Unauthorized!</span>
          <span>你没有权限进入此页面</span>
          <span>你可以尝试</span>
          <span class="link" @click="back">返回上一页</span>
        </div>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from "@/assets/401_images/401.gif";

export default {
  name: "page401",
  data() {
    return {
      errGif: errGif + "?" + +new Date()
    };
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: "/" });
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.errPage-container {
  width: 800px;
  margin: 100px auto;
  text-align: center;
  .container {
    span {
      display: block;
      line-height: 60px;
      font-size: 18px;
      color: #8b7b8b;
    }
    .warn {
      color: #ee9a00;
      font-size: 24px;
    }
    .link {
      line-height: 160px;
      color: #5cacee;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>
