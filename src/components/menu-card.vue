<!-- 功能选项组件 -->
<template>
  <div class="card" @click="menuClick">
    <img class="img" :src="img">
    <span class="title">{{menuTitle}}</span>
    <span class="content">{{menuContent}}</span>
  </div>
</template>

<script>
export default {
  name: "menu-card",
  components: {},
  data() {
    return {
      menuTitle: this.title,
      menuContent: this.content
    };
  },
  props: {
    img: String,
    title: String,
    content: String
  },
  computed: {},
  methods: {
    menuClick() {
      this.$emit("click");
    }
  },
  watch: {},
  created() {}
};
</script>

<style scoped>
.card {
  width: 320px;
  height: 240px;
  text-align: center;
  cursor: pointer;
  float: left;
  margin: 10px;
  border-radius: 20px;
  border-color: #B0B0B0;
}
.card .img {
  width: 80px;
  height: 80px;
  border-radius: 50px;
}
.card .title {
  font-size: 18px;
  color: #5cacee;
  font-weight: bold;
  margin-top: 10px;
  line-height: 40px;
  display: block;
}
.card .content {
  font-size: 15px;
  text-align: left;
  color: gray;
}
</style>