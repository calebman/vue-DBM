<!-- 布局测试组件 -->
<template>
  <div>
    <ul>
      <li v-for="i in 1000">布局测试{{i}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "test",
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

</style>