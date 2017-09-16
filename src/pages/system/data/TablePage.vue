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
        :height="100+item.columnsData.length*30"
        :key="index">
        <table-card
          :tableName="item.tableName"
          :tableDataCount="item.tableDataCount"
          :columnsData="item.columnsData"
          :position="item.position"
          @onEditTable="editTable"
          @onDelTable="delTable"
          @onDelCol="editTableData"></table-card>
      </waterfall-slot>
    </waterfall>
    <create-steps
      v-model="createStepsVisible"
      :table="tableParam"
      :selectMode="stepMode"
      @onEditTable="editTableData"></create-steps>
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
            position:[],
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
        },
        tableTree:{
          get(){
            return this.$store.state.tableTree
          },
          set(newValue){
            this.$store.state.tableTree = newValue
          }
        }
      },
      methods:{
        open(){
          this.createStepsVisible = true
          this.stepMode = "空表格"
        },
        search(value){
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
        editTable(tableName,columnsData,position){
          this.tableParam.tableName = tableName
          this.tableParam.columnsData = columnsData
          this.tableParam.tableData = []
          this.tableParam.position = position
          this.stepMode = "已存在表格"
          this.createStepsVisible = true
        },
        delTable(tableName){
          var data = {
            tableName:tableName
          }
          this.$http.post(this.HOST+'/admin/system/table/del',data).then((response) => {
            if(response.status == 200){
              this.items.forEach((v,i)=>{
                if(v.tableName == tableName){
                  this.items.splice(i,1)
                }
              })
            }
          })
        },
        editTableData(tableName,updateOpts){
          var data = {
            updateOpts:updateOpts
          }
          this.$http.post(this.HOST+'/admin/system/table/edit',data).then((response) => {
            if(response.status == 200){
              var table = {
                tableName:"",
                columnsData:[],
                tableDataCount:0
              }
              var tableIndex = -1
              this.items.forEach((v,i)=>{
                if(v.tableName == tableName){
                  table = v
                  tableIndex = i
                }
              })
              if(this.HOST == "static"){
                var tableTid = this.$utilHelper.generateUUID()
              }else{
                var tableTid = data.tid
              }
              updateOpts.forEach((upt,i)=>{
                switch (upt.opt){
                  case "addName":
                    tableIndex = -1
                    table.tableName = upt.tableName
                    break
                  case "rename":
                    this.items.forEach((v,i)=>{
                      if(v.tableName == upt.oldTableName){
                        table = v
                        tableIndex = i
                      }
                    })
                    table.tableName = upt.tableName
                    break
                  case "addPosition":
                    var table = {
                      value:tableTid,
                      label:upt.tableName,
                      status:-1,
                      children:[]
                    }
                    var node = this.$utilHelper.getNode(this.tableTree,upt.position[upt.position.length-1]).node
                    node.children.push(table)
                    break
                  case "changePosition":
                    var tableNodeId = upt.oldPosition[upt.oldPosition.length-1]
                    var table = {
                      value:tableNodeId,
                      label:upt.tableName,
                      status:-1,
                      children:[]
                    }
                    var parentNode = this.$utilHelper.getNode(this.tableTree,tableNodeId).parentNode
                    console.log(JSON.stringify(parentNode))
                    parentNode.children.forEach((v,i)=>{
                      if(v.value == tableNodeId){
                        parentNode.children.splice(i,1)
                      }
                    })
                    var tableRemoveNode = upt.newPosition[upt.newPosition.length-1]
                    var node = this.$utilHelper.getNode(this.tableTree,tableRemoveNode).node
                    node.children.push(table)
                    break
                  case "add":
                    table.columnsData.push(upt.col)
                    break
                  case "edit":
                    table.columnsData.forEach((col,i)=>{
                      if(col.prop == upt.col.prop){
                        table.columnsData.splice(i,1,upt.col)
                      }
                    })
                    break
                  case "del":
                    table.columnsData.forEach((col,i)=>{
                      if(col.prop == upt.col.prop){
                        table.columnsData.splice(i,1)
                      }
                    })
                    break
                }
              })
              if(tableIndex>-1){
                this.items.splice(tableIndex,1,table)
              }else{
                this.items.push(table)
              }
            }
          })
        }
      },
      props:{
        _tableInfos:Array
      }
    }
</script>
