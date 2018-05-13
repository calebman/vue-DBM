<!-- 功能卡片组件 -->
<template>
  <div>
    <menu-card v-for="item,index in sysMenu" :key="item.key" :img="item.img" :title="item.title" :content="item.content" @click="menuClick(item.key)"></menu-card>
  </div>
</template>

<script>
import menuCard from "../../components/menu-card";
export default {
  name: "menu-card-demo",
  components: {
    menuCard
  },
  data() {
    return {
      sysMenu: [
        {
          key: "center",
          title: "个人中心",
          content: "用户个人设置",
          img: "static/user-center.png"
        },
        {
          key: "user",
          title: "用户管理",
          content: "对系统的所有管理员进行新增、授权等操作",
          img: "static/users-manager.png"
        },
        {
          key: "role",
          title: "角色管理",
          content: "创建、修改或删除系统的角色",
          img: "static/role-manager.png"
        }
      ]
    };
  },
  props: {},
  computed: {},
  methods: {
    menuClick(key) {
      this.$message(key);
    }
  },
  watch: {},
  created() {}
};
</script>

<style scoped>

</style>