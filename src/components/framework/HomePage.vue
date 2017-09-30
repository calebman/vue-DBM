<style>
  .box{
    margin-top: 20px;
    margin-left: 10px;
  }
  .summary{
    margin-top: 25px;
  }
  .title{
    font-size: 25px;
  }
  .number{
    font-size: 35px;
  }
  .number_detail{
    color: #8391a5;
    font-size: 14px;
  }
</style>
<template>
  <div class="box">
    <span class="title">系统概览</span>
    <div class="summary">
      <Row :gutter="16">
        <Col span="6">
        <span class="number">5,300</span><br>
        <span class="number_detail">总计访问</span>
        </Col>
        <Col span="6">
        <span class="number">1,213</span><br>
        <span class="number_detail">总计数据</span>
        </Col>
        <Col span="6">
        <span class="number">0</span><br>
        <span class="number_detail">还没想好放什么</span>
        </Col>
        <Col span="6">
        <span class="number">0</span><br>
        <span class="number_detail">还没想好放什么</span>
        </Col>
      </Row>
    </div>
    <div>
      <Button type="info" size="large" style="margin-top: 20px;width: 100px" @click="send">add</Button>
    </div>
    <div class="summary">
      <Tabs style="margin-top: 10px" v-model="selectTab" :animated="false">
        <TabPane label="柱状与折线" name="accessCharts">
          <chart
            :_id="'accessCharts'"
            :_titleText="'访问量统计'"
            :_xText="'类别'"
            :_yText="'总访问量'"
            :_chartData="chartData"
            :_type="'LineAndBar'"></chart>
        </TabPane>
        <TabPane label="柱状或折线" name="dataCharts">
          <chart
            :_id="'dataCharts'"
            :_titleText="'访问量统计'"
            :_xText="'类别'"
            :_yText="'总访问量'"
            :_chartData="chartData"
            :_type="'LineOrBar'"></chart>
        </TabPane>
        <TabPane label="饼图" name="testCharts">
          <chart
            :_id="'testCharts'"
            :_titleText="'访问量统计'"
            :_xText="'类别'"
            :_yText="'总访问量'"
            :_chartData="chartData"
            :_type="'Pie'"></chart>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import chart from '../public/charts/Index.vue'
  export default {
    data () {
        return {
          selectTab:"",
          accessChars:{},
          dataChars:{},
          percent: 0,
          chartData:[]
        }
    },
    methods:{
      send(){
        var x = "类别"+(this.chartData.length+1)
        var y =Math.ceil(Math.random()*100)
        this.chartData.push([x,y])
      }
    },
    components:{
      chart
    },
    created(){
      let url = this.HOST+'/getCharsData'
      if(this.HOST=="static"){
        url+=".json"
      }
      this.$http.get(url).then((response) => {
        if(response.status == 200){
          this.chartData = response.body.data.chartsData
        }
      })
    }
  }
</script>
