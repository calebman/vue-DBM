<template>
  <div>
    <Row>
      <Col :span="3">
        <Button type="primary" @click="open">新建表格</Button>
      </Col>
      <Col :span="21">
        <AutoComplete
          clearable
          v-model="text"
          :data="tableNames"
          :filter-method="filterMethod"
          icon="ios-search"
          style="width:200px"
          @on-select="search"
          placeholder="输入表格名称搜索">

        </AutoComplete>
        <!--<Input style="width: 300px" placeholder="输入表格名称搜索" v-model="text">-->
          <!--<Button slot="append" icon="ios-search" @click="search"></Button>-->
        <!--</Input>-->
      </Col>
    </Row>
    <br>
    <waterfall
      align="center"
      :lineGap="10"
      :grow="grow"
      :watch="showItems">
      <waterfall-slot
        v-for="(item, index) in showItems"
        :width="400"
        :height="80+item.columnsData.length*30"
        :key="index">
        <table-card
          :tableName="item.tableName"
          :tableDataCount="item.tableDataCount"
          :columnsData="item.columnsData"
          @onEditTable="editTable"></table-card>
      </waterfall-slot>
    </waterfall>
    <create-steps v-model="createStepsVisible" :table="tableParam" :selectMode="stepMode"></create-steps>
  </div>
</template>

<script>
  import CreateSteps from './components/CreateSteps.vue'
  import TableCard from './components/TableCard.vue'
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
    export default {
      data () {
        return {
          grow: [1, 1, 1, 1],
          items:this._tableInfos,
          createStepsVisible:false,
          stepMode:"",
          text:"",
          searchText:"",
          filterCount:0,
          tableParam:{
            tableName:"",
            columnsData:[],
            tableData:[]
          }
        }
      },
      components:{
        CreateSteps, TableCard, Waterfall, WaterfallSlot
      },
      watch:{
        text(curVal,oldVal){
          this.filterCount = 0
          if(curVal==""){
            this.searchText = ""
          }
        }
      },
      computed:{
        showItems(){
          var show = []
          this.items.forEach((item,index)=>{
            if(item.tableName.indexOf(this.searchText)>-1){
              show.push(item)
            }
          })
          return show
        },
        tableNames(){
          var names = []
          this.items.forEach((item,index)=>{
            names.push(item.tableName)
          })
          return names
        }
      },
      methods:{
        open(){
          this.createStepsVisible = true
          this.stepMode = "空表格"
        },
        search(value){
          console.log(value)
          this.searchText = value
        },
        filterMethod (value, option) {
          if(option.indexOf(value) !== -1){
            this.filterCount++
            if(this.filterCount < 6)
              return true
          }
          return false
        },
        editTable(tableName,columnsData){
          this.tableParam.tableName = tableName
          this.tableParam.columnsData = columnsData
          this.tableParam.tableData = []
          this.stepMode = "已存在表格"
          this.createStepsVisible = true
        }
      },
      props:{
        _tableInfos:Array
      },
      created(){
//        var tableName = "测试表格"
//        var columnData = [{label:"文本列", type:"text"},
//          {label:"数字列", type:"number"},
//          {label:"选择列", type:"select"},
//          {label:"时间列", type:"date"},
//          {label:"图片列", type:"img"}]
//        for(var i=0;i<15;i++){
//          var getTableName = tableName+i
//          var getColumnData = []
//          var getTableDataCount = Math.floor(Math.random()*20000+0)
//          var columnCount = Math.floor(Math.random()*30+1)
//          for(var j=0;j<columnCount;j++){
//            var col = columnData[Math.floor(Math.random()*4)]
//            getColumnData.push({
//              label:col.label,
//              type:col.type,
//              prop:this.$utilHelper.generateUUID(),
//              items:[],
//              inputItem:"",
//              selectItem:""
//            })
//          }
//          this.items.push({
//            tableName:getTableName,
//            columnData:getColumnData,
//            tableDataCount:getTableDataCount
//          })
//          this.showItems.push({
//            tableName:getTableName,
//            columnData:getColumnData,
//            tableDataCount:getTableDataCount
//          })
 //       }
      }
    }
</script>
