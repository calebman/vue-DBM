<template>
  <section>
    <!--工具条-->
    <div style="padding-bottom: 3px;">
      <Row>
        <Col span="21">
          <Tooltip  :content="'为'+mtable.tableName+'新增一行数据'" placement="bottom-start" effect="light">
            <Button type="primary" size="small" icon="plus" @click="handleAdd">新增一行</Button>
          </Tooltip>
          <Tooltip  :content="'读取Excel文件数据导入'+mtable.tableName" placement="bottom-start" effect="light">
            <Upload :action="HOST+'/admin/data/table/'+mtable.tableName+'/create/import'"
                    :show-upload-list=false
                    :on-progress="importProgress">
              <Button type="primary" size="small" icon="ios-folder-outline">导入数据</Button>
            </Upload>
          </Tooltip>
          <Tooltip  :content="'将'+mtable.tableName+'导出为Excel文件'" placement="bottom-start" effect="light">
            <Button type="primary" size="small" icon="share" @click="exportData">导出数据</Button>
          </Tooltip>
          <Tooltip  :content="'为'+mtable.tableName+'构建数据筛选条件'" placement="bottom-start" effect="light">
            <Button type="primary" size="small" icon="ios-search" @click="handleFilter">构建筛选</Button>
          </Tooltip>
          <Tooltip :content="'删除'+mtable.tableName+'中选中的数据'" placement="bottom-start" effect="light" >
            <Button type="error" size="small" icon="ios-trash-outline" @click="handleDelSelect">删除选中</Button>
          </Tooltip>
        </Col>
        <Col span="3">
        <Poptip trigger="hover" placement="bottom-end" >
          <div>
            <Icon type="ios-analytics"></Icon>
            当前筛选
            <Icon type="chevron-down"></Icon>
          </div>
          <div class="api" slot="content">
            <filter-detail :filterParam="filterParam" :tableColumnsData="mtable.columns"></filter-detail>
          </div>
        </Poptip>
        </Col>
      </Row>
    </div>
    <!--列表-->
    <div class="demo-table">
      <Table
        :columns="tableColumns"
        :data="mtable.tableData"
        @on-selection-change="handleSelectionChange"
        v-if="!isLoading"
        @on-row-dblclick="handleEdit"
        size="small"
        no-data-text="数据为空"
        highlight-row
        border></Table>
      <div class="Spin" v-if="isLoading">
        <Spin  size="large" fix>
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
          <div>加载中</div>
        </Spin>
      </div>
    </div>
    <div style="margin-top:15px;margin-right:30px;" align="right">
      <Page
        @on-change="handleCurrentChange"
        :total="mtable.pagination.totalCount"
        :page-size ="mtable.pagination.pageSize"
        :current.sync="mtable.pagination.pageCurrent"
        show-total></Page>
    </div>
    <edit-dialog
      :editUrl="mtable.configs.editUrl"
      :addUrl="mtable.configs.addUrl"
      :tableName="mtable.tableName"
      :tableColumnsData="mtable.columns"
      :editParam="editParam"
      @onEditSuccess="editSuccess"></edit-dialog>
    <filter-dialog
      :filterUrl="mtable.configs.filterUrl"
      :tableColumnsData="mtable.columns"
      :tableName="mtable.tableName"
      @onFilterSuccess="filterSuccess"
      :filterParam="filterParam"></filter-dialog>
  </section>
</template>

<script>
  import EditDialog from './components/EditDialog/EditDialog.vue'
  import FilterDialog from './components/FilterDialog/FilterDialog.vue'
  import FilterDetail from './components/FilterDetail/FilterDetail.vue'
  import ImgColumn from './components/ImgColumn.vue'
  import ColumnHeader from './components/ColumnHeader.vue'
  import SelectColumn from './components/SelectColumn.vue'
  import TextColumn from './components/TextColumn.vue'
  export default {
    data() {
      return {
        mtable:this.value,
        editParam:{
          rowData:{},//编辑数据
          visible:false,//是否显示编辑对话框
          index:-1//编辑的表格索引
        },//编辑对话框参数
        filterParam:{
          filterData:{
            domains:[]//筛选参数,
          },
          role:"and",
          visible:false//是否显示筛选对话框
        },
        //以下的一些表格的信息配置
        multipleSelection: [],//选中数据
        isLoading:false,
        //运行配置
        runParam:{}
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.mtable.pagination.pageCurrent = val
        this.filterData()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      //进入编辑页面
      handleEdit(row) {
        var rowData = {}
        for(let key in row) {
          rowData[key] = row[key]
        }
        this.editParam.rowData = rowData
        this.editParam.isAdd = false
        this.editParam.visible = true
      },
      editSuccess(isAdd,rowData){
        if(isAdd){
          this.mtable.tableData.splice(0, 0, rowData)
          this.mtable.pagination.totalCount = this.mtable.pagination.totalCount+1
          this.$Notice.success({title: '操作成功', desc: '对'+this.mtable.tableName+'数据的添加操作成功'})
        }else{
          let i = -1
          this.mtable.tableData.forEach((v,index)=>{
            if(v.tid == rowData.tid){
              i = index
            }
          })
          this.mtable.tableData.splice(i, 1, rowData)
          //提示操作成功
          this.$Notice.success({title: '操作成功', desc: '对'+this.mtable.tableName+'数据的编辑操作成功'})
        }
      },
      //删除选中提示
      handleDelSelect() {
        if(this.multipleSelection.length > 0){
          var data = {
            delRows:this.multipleSelection
          }
          this.$http.post(this.HOST+this.mtable.configs.delUrl, data).then((response) => {
            if(response.status == 200){
              this.$Notice.success({title: '操作成功', desc: '对'+this.mtable.tableName+'数据的删除操作成功'})
              this.filterData({
                columns:this.mtable.columns,
                filter: this.filterParam.filterData.domains,
                pageSize: this.mtable.pagination.pageSize,
                pageCurrent: 1
              })
            }else{
              this.$Notice.warning({title: '操作失败', desc: '对'+this.mtable.tableName+'数据的删除操作失败'})
            }
          })
        }else{
          this.$Message.warning('请选中至少一行数据');
        }
      },
      //显示新增界面并组装初始化内容
      handleAdd () {
        var nullRow = {}
        var c = this.mtable.columns
        c.forEach((value,index)=>{
          for(let key in value){
            if(value["type"] == "number"){
              nullRow[value["prop"]] = 0
            }else nullRow[value["prop"]] = ""
          }
        })
        this.editParam.isAdd = true
        this.editParam.visible = true
        this.editParam.rowData = nullRow
      },
      //筛选
      handleFilter () {
        this.filterParam.visible = true
      },
      //监听筛选项变化并发起查询请求
      filterSuccess(filterParams,param){
        this.filterParam = param
        this.filterData(filterParams)
      },
      filterData(fData){
        this.isLoading = true
        this.runParam.filterParam = fData
        this.$emit('FilterData',fData)
        var data = {}
        if(fData){
          data = fData
        }else{
          data = {
            columns:this.mtable.columns,
            filter: this.filterParam.filterData.domains,
            pageSize: this.mtable.pagination.pageSize,
            pageCurrent: this.mtable.pagination.pageCurrent
          }
        }
        this.$http.post(this.HOST+this.mtable.configs.filterUrl, data).then((response) => {
          if(response.status == 200){
            this.isLoading = false
            var data = response.body.data
            this.mtable.tableData = data.tableData
            this.mtable.pagination = data.pagination
          }
        })
      },
      //根据接收的列值构建数据列
      createColumns(columnsData){
        var tableCol = []
        tableCol.push({
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: "left"
        })
        tableCol.push({
          type: 'index',
          width: 60,
          align: 'center',
          fixed: "left"
        })
        columnsData.forEach((value,index)=>{
          var item = {}
          item.title = value.label
          item.key = value.prop
          item.align = "left"
          switch (value.type){
//                case 'date':
//                  break
//                case 'number':
//                  break
                case 'select':
                  item.render = (h, params) => {
                    return h('div', [
                      h(SelectColumn,{
                        props:{
                          data:params.row[item.key]
                        }
                      })
                    ])
                  }
                  break
                case 'img':
                  item.render = (h, params) => {
                    return h('div', [
                      h(ImgColumn,{
                        props:{
                          row:params.row,
                          rowKey:item.key,
                          tableName:this.mtable.tableName
                        },
                        on:{
                          onImgChange: (tid,rowKey,urls) => {
                            var i = -1
                            this.mtable.tableData.forEach((value,index)=>{
                              if(value.tid == tid){
                                i = index
                              }
                            })
                            var row = this.mtable.tableData[i]
                            row[rowKey] = urls
                          }
                        }
                      })
                    ])
                  }
                  break
            default:
              //item.ellipsis = true
              item.render = (h, params) => {
                return h('div', [
                  h(TextColumn,{
                    props:{
                      data:params.row[item.key]
                    }
                  })
                ])
              }
              break
          }
          item.renderHeader = (h, column) => {
            return h('div',[
              h(ColumnHeader,{
                props:{
                  column:column.column
                }
              })
            ])
          }
          if(this.mtable.columns.length>7){
            item.width = "200"
          }
          tableCol.push(item)
        })
        return tableCol
      },
      //上传excel进度
      importProgress(event){
        this.$store.commit('addEvent',{
          percent:(20*event.percent)/100,
          detail:"正在处理excel文件"
        })
      },
      //导出数据
      exportData(){
        var data = {
          columns:this.mtable.columns,
          filter: this.filterParam.filterData.domains
        }
        this.$http.post(this.HOST+"/admin/data/table/"+this.mtable.tableName+"/create/export", data).then((response) => {
          if(response.status == 200){
            var downloadItem = {
              detail:this.mtable.tableName+"导出成功，点击下载",
              url: response.body.data.fileUrl
            }
            this.$store.commit("addFastItem",downloadItem)
            this.$Message.success("数据导出成功")
          }
        })
      }
    },
    computed: {
      tableColumns(){
        return this.createColumns(this.mtable.columns)
      }
    },
    //时间、选择、文本筛选控件,用于根据筛选条件动态创建
    components:{
      EditDialog, FilterDialog, FilterDetail, ImgColumn, ColumnHeader, SelectColumn, TextColumn
    },
    props:{
      value:{
        type:Object,
        default: function () {
          return {
            tableName:"",
            tableData:[],
            columns:[],
            configs:{},
            pagination:{}
          }
        }
      }
    },
    watch:{
      value:{
        handler:function(val,oldVal){
          this.mtable = val
        },
        deep:true
      },
      mtable:{
        handler:function(val){
          this.$emit('input',val)
        },
        deep:true
      }
    }
  }
</script>
<style>
  .demo-table{
    display: inline-block;
    overflow: auto;
    width: 100%;
    max-height: 600px;
    position: relative;
  }
  .Spin{
    display: inline-block;
    overflow: auto;
    width: 100%;
    height: 600px;
    position: relative;
  }

</style>
