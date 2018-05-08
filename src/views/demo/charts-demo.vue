<!-- 图表组件使用示例 -->
<template>
  <div>
    <el-tabs v-model="tabPosition" type="border-card">
      <el-tab-pane label="线性图" name="line">
        <charts :chartData="chartData" chartType="line" ref="line"></charts>
        <el-button-group>
          <el-button type="primary" @click="add">增加一项</el-button>
          <el-button type="danger" @click="remove">删除一项</el-button>
        </el-button-group>
      </el-tab-pane>
      <el-tab-pane label="柱状图" name="bar">
        <charts :chartData="chartData" chartType="bar" ref="bar"></charts>
        <el-button-group>
          <el-button type="primary" @click="add">增加一项</el-button>
          <el-button type="danger" @click="remove">删除一项</el-button>
        </el-button-group>
      </el-tab-pane>
      <el-tab-pane label="饼图" name="pie">
        <charts :chartData="chartData" chartType="pie" ref="pie"></charts>
        <el-button-group>
          <el-button type="primary" @click="add">增加一项</el-button>
          <el-button type="danger" @click="remove">删除一项</el-button>
        </el-button-group>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import charts from "../../components/charts";
export default {
  name: "charts-demo",
  components: {
    charts
  },
  data() {
    return {
      tabPosition: "line",
      chartData: [["类别1", 10], ["类别2", 20]],
      chartRefs: ["line", "bar", "pie"]
    };
  },
  props: {},
  computed: {},
  methods: {
    add() {
      var x = "类别" + (this.chartData.length + 1);
      var y = Math.ceil(Math.random() * 100);
      this.chartData.push([x, y]);
      for (let index in this.chartRefs) {
        this.$refs[this.chartRefs[index]].drawChart();
      }
    },
    remove() {
      if (this.chartData.length <= 2) {
        this.$message({
          message: "至少需要两项数据才能绘图呀！",
          type: "warning"
        });
        return;
      }
      this.chartData.splice(this.chartData.length - 1, 1);
      for (let index in this.chartRefs) {
        this.$refs[this.chartRefs[index]].drawChart();
      }
    }
  },
  watch: {
    // tabPosition(val) {
    //   this.$refs[val].drawChart();
    // }
  },
  created() {}
};
</script>

<style scoped>

</style>