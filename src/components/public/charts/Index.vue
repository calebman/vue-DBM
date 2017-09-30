<style scoped>
  .chart {
    width: 90%;
    height: 600px;
    position: relative;
    left: 50%;
    margin-left: -45%;
    box-shadow: 0 0 10px #726dd1;
    border-radius: 10px;
  }
</style>
<template>
  <div :id="_id" class="chart"></div>
</template>

<script>
  import echarts from 'echarts';
  export default {
    data() {
      return {

      }
    },
    props:{
      _id:String,
      _titleText:String,
      _xText:String,
      _yText:String,
      _chartData:Array,
      _type:String
    },
    watch:{
      _chartData(val){
        switch (this._type){
          case "LineAndBar":
            drawLineAndBar(val,this._id,this._titleText,this._xText,this._yText);
            break
          case "LineOrBar":
            drawLineOrBar(val,this._id,this._titleText,this._xText,this._yText);
            break
          case "Pie":
            drawPie(val,this._id,this._titleText,this._xText,this._yText);
            break
          default:
            drawLineAndBar(val,this._id,this._titleText,this._xText,this._yText);
            break
        }
      }
    },
    mounted() {
      switch (this._type){
        case "LineAndBar":
          drawLineAndBar(this._chartData,this._id,this._titleText,this._xText,this._yText);
          break
        case "LineOrBar":
          drawLineOrBar(this._chartData,this._id,this._titleText,this._xText,this._yText);
          break
        case "Pie":
          drawPie(this._chartData,this._id,this._titleText,this._xText,this._yText);
          break
        default:
          drawLineAndBar(this._chartData,this._id,this._titleText,this._xText,this._yText);
          break
      }
    }
  }
  //绘制函数
  function drawLineAndBar(chartData,id,titleText,xText,yText) {
    var chart = echarts.init(document.getElementById(id))
    var xAxisData = chartData.map(function (item) {return item[0]})
    var yAxisData = chartData.map(function (item) {return item[1]})
    chart.setOption({
      backgroundColor: '#0f375f',
      title: {
        text: titleText,
        subtext: ''
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true,
            backgroundColor: '#333'
          }
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {show: true}
        },
        top: 10,
        right: 40
      },
      legend: {
        data: ['line', 'bar'],
        textStyle: {
          color: '#ccc'
        }
      },
      xAxis: {
        data: xAxisData,
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      yAxis: {
        splitLine: {show: false},
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      series: [{
        name: yText,
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 15,
        data: yAxisData
      }, {
        name: yText,
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 5,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#14c8d4'},
                {offset: 1, color: '#43eec6'}
              ]
            )
          }
        },
        data: yAxisData
      }]
    })
  }
  function drawLineOrBar(chartData,id,titleText,xText,yText) {
    var chart = echarts.init(document.getElementById(id))
    var xAxisData = chartData.map(function (item) {return item[0]})
    var yAxisData = chartData.map(function (item) {return item[1]})
    chart.setOption({
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        feature: {
          magicType:{show: true, type: ['line', 'bar']},
          saveAsImage: {show: true}
        },
        top: 10,
        right: 40
      },
      calculable: true,
      grid: {
        left: '3%',
        right: '6%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: xAxisData
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: yText,
          max: Math.max.apply(Math,yAxisData)
        }
      ],
      series: [
        {
          name: yText,
          type: 'bar',
          markPoint: {
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          },
          markLine: {
            data: [
              {type: 'average', name: '平均值'}
            ]
          },
          itemStyle: {
            normal: {
              barBorderRadius: 20,
              color: '#726dd1',
              shadowColor: 'rgba(0, 0, 0, 0.4)',
              shadowBlur: 20
            }
          },
          data: yAxisData
        }
      ]
    })
  }
  function drawPie(chartData,id,titleText,xText,yText) {
    var chart = echarts.init(document.getElementById(id))
    var xAxisData = chartData.map(function (item) {return item[0]})
    var pieData = []
    chartData.forEach((v,i)=>{
      pieData.push({
        name:v[0],
        value:v[1]
      })
    })
    chart.setOption({
      title : {
        text: titleText,
        subtext: '',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: xAxisData
      },
      series : [
        {
          name: xText,
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:pieData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }
</script>
