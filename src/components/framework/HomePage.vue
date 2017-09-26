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
    <div class="summary">
      <Tabs style="margin-top: 10px" v-model="selectTab" :animated="false">
        <TabPane label="访问量" name="accessChars">
          <div id="accessChar" style="width: 100%;height: 500px"></div>
        </TabPane>
        <TabPane label="数据量" name="dataChars">
          <div id="dataChar" style="width: 100%;height: 500px"></div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data () {
        return {
          selectTab:"",
          accessChars:{},
          dataChars:{},
          percent: 0
        }
    },
    methods:{
      send(){

      }
    },
    mounted(){
      // 基于准备好的dom，初始化echarts实例
      this.accessChars = echarts.init(document.getElementById('accessChar'));
      this.dataChars = echarts.init(document.getElementById('dataChar'));
    },
    created(){
      let option = {
        // Make gradient line here
        visualMap: {
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 400
        },
        title: {
          left: 'center',
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: []
        },
        yAxis: {
          splitLine: {show: false}
        },
        grid: {
          bottom: '20%'
        },
        series: {
          type: 'line',
          showSymbol: false,
          data: []
        }
      };
      let url = this.HOST+'/getCharsData'
      if(this.HOST=="static"){
        url+=".json"
      }
      this.$http.get(url).then((response) => {
        if(response.status == 200){
          let accessList = response.body.data.accessList
          option.xAxis.data = accessList.map(function (item) {return item[0]})
          option.series.data = accessList.map(function (item) {return item[1]})
          option.title.text = "系统访问量统计"
          this.accessChars.setOption(option)
          let dataList = response.body.data.dataList
          option.xAxis.data = dataList.map(function (item) {return item[0]})
          option.series.data = dataList.map(function (item) {return item[1]})
          option.title.text = "系统总数据量统计"
          this.dataChars.setOption(option)
        }
      })
    }
  }
</script>
