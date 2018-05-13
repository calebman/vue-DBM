<!-- 权限页面 -->
<template>
  <div class="content">
    <span>admin才能进入此页面</span>
    <span>使用watcher账号登录无法查看此页面</span>
    
  </div>
</template>

<script>
export default {
  name: "admin-permission",
  components: {},
  data() {
    return {};
  },
  props: {},
  computed: {},
  methods: {},
  watch: {},
  created() {}
};
</script>

<style scoped>
.content {
  width: 100%;
  margin: 0 auto;
  margin-top: 150px;
}
.content span {
  margin-top: 20px;
  display: block;
}
</style>