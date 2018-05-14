<template>
    <div style="width:100%;height:100%;" id="table_data_pie"></div>
</template>

<script>
const echarts = require('echarts');
export default {
    name: 'tableDataPie',
    data () {
        return {
            //
        };
    },
    props:{
        tableData:Array
    },
    mounted () {
        draw(this.tableData);
    },
    watch:{
        tableData(val){
            draw(val);
        }
    }
};
function draw(tableData) {
    let dataSourcePie = echarts.init(document.getElementById('table_data_pie'));
    let legentData = [];
    let seriesData = [];
    tableData.forEach((v,i)=>{
        legentData.push(v.tableName);
        seriesData.push({
            value:v.dataCount,
            name:v.tableName
        })
    })
    const option = {
        title: {
            text: '数据总量统计',
            textStyle: {
                color: '#235894'
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: legentData
        },
        series : [
            {
                name: '数据总量',
                type: 'pie',
                radius : '55%',
                center: ['35%', '50%'],
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                lableLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: seriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    dataSourcePie.setOption(option);
    window.addEventListener('resize', function () {
        dataSourcePie.resize();
    });
}
</script>
