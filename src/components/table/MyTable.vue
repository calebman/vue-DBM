<template>
  <section>
    <!--工具条-->
    <div style="padding-bottom: 3px;">
      <Row>
        <Col span="21">
          <Tooltip  :content="'为'+tableName+'新增一行数据'" placement="bottom-start" effect="light">
            <Button type="primary" size="small" icon="plus" @click="handleAdd">新增一行</Button>
          </Tooltip>
          <Tooltip  :content="'读取Excel文件数据导入'+tableName" placement="bottom-start" effect="light">
            <Button type="primary" size="small" icon="ios-folder-outline" @click="importData">导入数据</Button>
          </Tooltip>
          <Tooltip  :content="'将'+tableName+'导出为Excel文件'" placement="bottom-start" effect="light">
            <Button type="primary" size="small" icon="share" @click="exportData">导出数据</Button>
          </Tooltip>
          <Tooltip  :content="'为'+tableName+'构建数据筛选条件'" placement="bottom-start" effect="light">
            <Button type="primary" size="small" icon="ios-search" @click="handleFilter">构建筛选</Button>
          </Tooltip>
          <Tooltip :content="'删除'+tableName+'中选中的数据'" placement="bottom-start" effect="light" >
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
            <c-show-filter-detail :filterParam="filterParam" :tableColumnsData="tableColumnsData"></c-show-filter-detail>
          </div>
        </Poptip>
        </Col>
      </Row>
    </div>
    <!--列表-->
    <div class="demo-table">
      <Table
        :columns="tableColumns"
        :data="tableData"
        @on-selection-change="handleSelectionChange"
        v-if="!isLoading"
        @on-row-dblclick="handleEdit"
        height="600"
        size="small"
        highlight-row
        border></Table>
      <Spin size="large" fix v-if="isLoading">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>加载中</div>
      </Spin>
    </div>
    <div style="margin-top:15px;margin-right:30px;" align="right">
      <Page
        @on-change="handleCurrentChange"
        :total="pagination.totalCount"
        :page-size ="pagination.pageSize"
        :current.sync="pagination.pageCurrent"
        show-total></Page>
    </div>
    <c-edit-dialog
      :editUrl="configs.editUrl"
      :addUrl="configs.addUrl"
      :tableName="tableName"
      :tableColumnsData="tableColumnsData"
      :editParam="editParam"
      @onEditSuccess="editSuccess"></c-edit-dialog>
    <c-filter-dialog
      :filterUrl="configs.filterUrl"
      :tableColumnsData="tableColumnsData"
      :tableName="tableName"
      @onFilterSuccess="filterSuccess"
      :filterParam="filterParam"></c-filter-dialog>
  </section>
</template>

<script>
  import CEditDialog from './components/CEditDialog.vue'
  import CFilterDialog from './components/CFilterDialog.vue'
  import CShowFilterDetail from './components/CShowFilterDetail.vue'
  import CImg from './components/CImg.vue'
  import ColumnHeader from './components/ColumnHeader.vue'
  import SelectTag from  './components/SelectTag.vue'
  export default {
    data() {
      return {
        tableName:this._tableName,
        tableData: this._tableData,//表格数据
        tableColumnsData:this._columns,//表格列源数据
        configs:this._configs,//筛选、编辑、删除数据Url
        pagination:this._pagination,//分页属性
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
        isLoading:false
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.pagination.pageCurrent = val
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
          this.tableData.splice(0, 0, rowData)
          this.pagination.totalCount = this.pagination.totalCount+1
          this.$Notice.success({title: '操作成功', desc: '对'+this.tableName+'数据的添加操作成功'})
        }else{
          let i = -1
          this.tableData.forEach((v,index)=>{
            if(v.tid == rowData.tid){
              i = index
            }
          })
          this.tableData.splice(i, 1, rowData)
          //提示操作成功
          this.$Notice.success({title: '操作成功', desc: '对'+this.tableName+'数据的编辑操作成功'})
        }
      },
      //删除数据提示
      handleDel(index) {
        var row = this.tableData[index]
        var data = {
          delRows:[]
        }
        data.delRows.push(row)
        this.$http.post(this.HOST+this.configs.delUrl, data).then((response) => {
          if(response.status == 200){
            this.tableData.splice(index,1)
            this.$Notice.success({title: '操作成功', desc: '对'+this.tableName+'数据的删除操作成功'})
            this.filterData({
              columns:this.tableColumnsData,
              filter: this.filterParam.filterData.domains,
              pageSize: this.pagination.pageSize,
              pageCurrent: 1
            })
          }
        })
      },
      //删除选中提示
      handleDelSelect() {
        if(this.multipleSelection.length > 0){
          var data = {
            delRows:this.multipleSelection
          }
          this.$http.post(this.HOST+this.configs.delUrl, data).then((response) => {
            if(response.status == 200){
              this.$Notice.success({title: '操作成功', desc: '对'+this.tableName+'数据的批量删除操作成功'})
            }else if(response.status == 101){
              this.$Notice.warning({title: '部分操作失败', desc: '部分数据删除失败，可能已不存在'})
            }
            this.filterData({
              columns:this.tableColumnsData,
              filter: this.filterParam.filterData.domains,
              pageSize: this.pagination.pageSize,
              pageCurrent: 1
            })
          })
        }else{
          this.$Message.warning('请选中至少一行数据');
        }
      },
      //显示新增界面并组装初始化内容
      handleAdd () {
        var nullRow = {}
        var c = this.tableColumnsData
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
        var data = {}
        if(fData){
          data = fData
        }else{
          data = {
            columns:this.tableColumnsData,
            filter: this.filterParam.filterData.domains,
            pageSize: this.pagination.pageSize,
            pageCurrent: this.pagination.pageCurrent
          }
        }
        this.$http.post(this.HOST+this.configs.filterUrl, data).then((response) => {
          if(response.status == 200){
            this.isLoading = false
            var data = response.body.data
            this.tableData = data.tableData
            this.pagination = data.pagination
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
                      h(SelectTag,{
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
                      h(CImg,{
                        props:{
                          row:params.row,
                          rowKey:item.key,
                          tableName:this.tableName
                        },
                        on:{
                          onImgChange: (tid,rowKey,urls) => {
                            var i = -1
                            this.tableData.forEach((value,index)=>{
                              if(value.tid == tid){
                                i = index
                              }
                            })
                            var row = this.tableData[i]
                            row[rowKey] = urls
                          }
                        }
                      })
                    ])
                  }
                  break
            default:
              item.ellipsis = true
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
          if(this.tableColumnsData.length>7){
            item.width = "200"
          }
          tableCol.push(item)
        })
        return tableCol
      },
      //导入数据
      importData(){
        this.$Loading.start()
        console.log("start")
        var t
        clearTimeout(t)
        t = setTimeout(()=>{
          console.log("finish")
          this.$Loading.finish()
        }, 3000)
      },
      //导出数据
      exportData(){
        var data = {
          columns:this.tableColumnsData,
          filter: this.filterParam.filterData.domains
        }
        this.$http.post(this.HOST+"/admin/data/table/"+this.tableName+"/create/export", data).then((response) => {
          if(response.status == 200){
            var fileUrl = response.body.data.fileUrl
            this.$Message.success("数据导出成功")
          }
        })
      }
    },
    computed: {
      tableColumns(){
        return this.createColumns(this.tableColumnsData)
      }
    },
    watch:{

    },
    //时间、选择、文本筛选控件,用于根据筛选条件动态创建
    components:{
      CEditDialog, CFilterDialog, CShowFilterDetail, CImg, ColumnHeader, SelectTag
    },
    props:{
      _tableName:String,
      _tableData:Array,
      _columns:Array,
      _configs:{
        type:Object,
        default: function () {
          return {}
        }
      },
      _pagination:{
        type:Object,
        default: function () {
          return {}
        }
      }
    }
  }
</script>
<style>
  .demo-table{
    display: inline-block;
    width: 100%;
    height: 600px;
    position: relative;
  }

</style>
