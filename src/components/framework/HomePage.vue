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
        <span class="number">{{showAccessCount}}</span><br>
        <span class="number_detail">总计访问</span>
        </Col>
        <Col span="6">
        <span class="number">{{showDataCount}}</span><br>
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
        <TabPane label="系统访问量" name="accessCharts">
          <chart
            :_id="'accessCharts'"
            :_titleText="'访问量统计'"
            :_xText="'日期'"
            :_yText="'总访问量'"
            :_chartData="accessList"
            :_type="'LineAndBar'"></chart>
        </TabPane>
        <TabPane label="系统数据总量" name="dataCharts">
          <chart
            :_id="'dataCharts'"
            :_titleText="'数据总量统计'"
            :_xText="'日期'"
            :_yText="'表格数据总量'"
            :_chartData="dataList"
            :_type="'LineOrBar'"></chart>
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
          accessList:[],
          dataList:[],
          accessCount:1005,
          dataCount:12002
        }
    },
    methods:{
      send(){
        var x = "类别"+(this.chartData.length+1)
        var y =Math.ceil(Math.random()*100)
        this.chartData.push([x,y])
      }
    },
    computed:{
      showAccessCount(){
        return this.$utilHelper.formatNum(this.accessCount)
      },
      showDataCount(){
        return this.$utilHelper.formatNum(this.dataCount)
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
          this.accessList = response.body.data.accessList
          this.accessCount = eval( this.accessList.map(function (item) {return item[1]}).join("+"))
          this.dataList = response.body.data.dataList
          this.dataCount = this.dataList[this.dataList.length-1][1]
        }
      })
    }
  }
</script>
