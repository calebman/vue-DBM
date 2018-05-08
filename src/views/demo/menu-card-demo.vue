<!-- 功能卡片组件 -->
<template>
    <div>
        <menu-card v-for="item,index in lockMenu" :key="item.key" :img="item.img" :title="item.title" :content="item.content" @click="menuClick(item.key)"></menu-card>
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
      lockMenu: [
        {
          key: "record",
          title: "授权记录",
          content: "查询、筛选用户的实名授权开锁信息",
          img: "static/auth-lock-record.png"
        },
        {
          key: "openLockRecord",
          title: "开锁记录",
          content: "查询、筛选用户的实名开锁信息",
          img: "static/open-lock-record.png"
        }
      ]
    };
  },
  props: {},
  computed: {},
  methods: {
    menuClick(key) {
      this.$Message.success(key);
    }
  },
  watch: {},
  created() {}
};
</script>

<style scoped>

</style>