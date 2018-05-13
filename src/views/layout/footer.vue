<!-- 底部布局 -->
<template>
  <div class="layout-footer">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "footer",
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

<style lang="less" scoped>
.layout-footer {
  position: absolute;
  width: 100%;
  background-color: #fafafa;
  height: 50px;
  text-align: center;
  line-height: 50px;
  bottom: 0;
}
</style>