<style>
  .span_excel_detail{
    font-size: 18px;
    color: #5e7382;
  }
</style>
<template>
  <Modal v-model="v" width="1000" :closable="false">
    <div slot="header">
      <Steps :current="current" :status="status" style="margin:0 auto;width: 800px">
        <Step title="创建表格" content="请输入表格名称，可选择excel导入"></Step>
        <Step title="初始化列" content="编辑表格的列项"></Step>
        <Step title="确认修改" content="生成改动日志，确认提交"></Step>
      </Steps>
    </div>
    <div style="height: 500px;overflow:auto;">
      <template v-if="current == 0">
        <Input v-model="tableParam.tableName" size="large" placeholder="表格名称"></Input>
        <br><br>
        <RadioGroup v-model="selectMode">
          <Radio v-if="selectMode != '已存在表格'" label="空表格"></Radio>
          <Radio v-if="selectMode != '已存在表格'" label="从文件导入"></Radio>
        </RadioGroup>
        <br><br>
        <div v-if="selectMode == '从文件导入'" style="text-align:center;">
          <Upload
            :action="HOST+'/admin/system/table/excel'"
            :format="['xls','xlsx']"
            :max-size="1024"
            :show-upload-list="false"
            :on-success="handleSuccess">
            <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
          </Upload>
          <br>
          <template v-if="tableParam.columnsData.length > 0">
            <span class="span_excel_detail">上传表格共{{tableParam.columnsData.length}}列</span>
            <br>
            <span v-if="tableParam.tableData.length > 0" class="span_excel_detail">附带数据{{tableParam.tableData.length}}行</span>
            <span v-if="tableParam.tableData.length == 0" class="span_excel_detail">没有附带数据</span>
          </template>
          <template v-if="tableParam.columnsData.length == 0">
            <span class="span_excel_detail">支持 xls、xlsx 文件</span>
            <br>
            <span class="span_excel_detail">体积不超过 1MB</span>
          </template>
        </div>
      </template>
      <template v-if="current == 1">
        <ul>
          <li style="margin-top: 6px">
            <Alert style="font-size: 16px"  show-icon closable>
              请依次编辑列名称、列类型，如存在可选列则需额外设置选择项
            </Alert>
          </li>
          <li v-for="(item,index) in setp2Param.showErrorInfo">
            <Alert type="error" show-icon closable @on-close="delErrorInfo(index)">{{item.info}}</Alert>
          </li>
          <li v-for="(item,index) in tableParam.columnsData" style="margin-top: 6px">
            <Row>
              <Col :span="6">
                <Input v-model="item.label" placeholder="请输入列名称" style="width: 200px"></Input>
              </Col>
              <Col :span="6">
                <Select v-model="item.type" style="width: 200px">
                  <Option v-for="item in setp2Param.typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Col>
              <Col v-if="item.type=='select'" :span="9">
                <Input v-model="item.inputItem" style="width: 300px">
                  <Select v-model="item.selectItem" slot="prepend" style="width: 80px" :placeholder="'共'+item.items.length+'项'">
                    <Option v-for="item in item.items" :value="item.value" :key="item.value" disabled>{{ item.value }}</Option>
                  </Select>
                  <Button slot="append" icon="checkmark" @click="addItem(item)"></Button>
                </Input>
              </Col>
              <Col :span="3">
                <Button type="error" @click="delColumn(index)">删除此项</Button>
              </Col>
            </Row>
          </li>
          <li style="margin-top: 10px">
            <Button type="info" @click="addColumn" long>添加一列</Button>
          </li>
        </ul>
      </template>
      <template v-if="current == 2">
        <ul>
          <li v-for="item in editLog">
            <Alert style="font-size: 14px" :type="item.type" show-icon>{{item.info}}</Alert>
          </li>
          <li v-if="editLog.length == 0">
            <Alert style="font-size: 14px" show-icon>没有任何改动日志</Alert>
          </li>
        </ul>
      </template>
    </div>
    <div slot="footer">
      <ButtonGroup>
        <Button type="primary" @click="prev" :disabled="prevDisabled">
          <Icon type="chevron-left"></Icon>
          上一步
        </Button>
        <Button type="primary" @click="next" :disabled="nextDisabled">
          下一步
          <Icon type="chevron-right"></Icon>
        </Button>
        <Button type="primary" @click="commit" :disabled="commitDisabled">
          提交表格
        </Button>
      </ButtonGroup>
    </div>
  </Modal>
</template>

<script>
    export default {
      data() {
        return {
          v:this.value,
          current:0,
          status:"wait",
          tableParam:{},
          editLog:[],
          updateOpts:[],
          canCommit:false,
          importTableParam:{
            tableName:"",
            columnsData:[],
            tableData:[]
          },
          setp2Param:{
            showErrorInfo:[],
            typeList: [
              {
                value: 'text',
                label: '文本类型'
              },
              {
                value: 'number',
                label: '数字类型'
              },
              {
                value: 'date',
                label: '时间类型'
              },
              {
                value: 'select',
                label: '可选类型'
              },
              {
                value: 'img',
                label: '图片类型'
              }
            ]
          },
        }
      },
      props:{
        value:Boolean,
        selectMode:String,
        table:{
          type: Object,
          default() {
            return {
              tableName:"",
              columnsData:[],
              tableData:[]
            }
          }
        }
      },
      watch:{
        v(val){
          this.current = 0
          switch (this.selectMode){
            case "已存在表格":
              this.tableParam = JSON.parse(JSON.stringify(this.table))
              break
            case "空表格":
              this.tableParam = {
                tableName:"",
                columnsData:[],
                tableData:[]
              }
              break
            case "从文件导入":
              this.tableParam = this.importTableParam
              break
          }
          this.$emit('input',val)
        },
        value(val){
          this.v = val
        },
        current(val){
          switch (val){
            case 0:
              this.updateOpts = []
              break
            case 1:
              this.updateOpts = []
              break
            case 2:
              var getEdit = {}
              switch (this.selectMode){
                case "已存在表格":
                  getEdit = this.getEditLog(JSON.parse(JSON.stringify(this.table)),this.tableParam)
                  break
                case "空表格":
                  getEdit = this.getEditLog(null,this.tableParam)
                  break
                case "从文件导入":
                  getEdit = this.getEditLog(null,this.tableParam)
                  break
              }
              this.editLog=getEdit.logs
              this.updateOpts=getEdit.updateOpts
          }
        }
      },
      methods:{
        prev(){
          this.current --
        },
        next(){
          this.current ++
        },
        commit(){
          this.v = false
          this.$emit('onEditTable',this.tableParam.tableName,this.updateOpts)
        },
        handleSuccess(res, file) {
          res.data.columnsData.forEach((value,index)=>{
            this.importTableParam.columnsData.push({
              label:value.label,
              type:value.type,
              prop:value.prop,
              inputItem:"",
              selectItem:"",
              items:[]
            })
          })
          this.importTableParam.tableName = file.name.substring(0, file.name.indexOf("."))
          this.importTableParam.tableData =  res.data.tableData
          this.tableParam = this.importTableParam
        },
        addColumn(){
          var col={
            label:"",
            type:"text",
            prop:this.$utilHelper.generateUUID(),
            inputItem:"",
            selectItem:"",
            items:[]
          }
          this.tableParam.columnsData.push(col)
        },
        delColumn(index){
          this.tableParam.columnsData.splice(index,1)
        },
        addItem(item){
          if(item.inputItem == ""){
            this.setp2Param.showErrorInfo.push({
              info:"添加的数据项不能为空"
            })
            return ;
          }
          var canInput = true
          item.items.forEach((value,index)=>{
            if(value.value == item.inputItem){
              canInput = false
            }
          })
          if(canInput){
            item.items.push({
              value:item.inputItem
            })
            item.inputItem = ""
          }else{
            this.setp2Param.showErrorInfo.push({
              info:"列"+item.label+"的数据项"+item.inputItem+"已存在"
            })
          }
        },
        delErrorInfo(index){
          this.setp2Param.showErrorInfo = []
        },
        getEditLog(oldTable,newTable){
          var getEdit = {
            logs:[],
            updateOpts:[]
          }
          var log = []
          var sameItem = []
          this.canCommit = true
          //检测表名变化
          if(oldTable){
            if(newTable.tableName != oldTable.tableName){
              getEdit.logs.push({
                type:"warning",
                info:"数据表【"+oldTable.tableName+"】表名变更为【"+newTable.tableName+"】"
              })
              getEdit.updateOpts.push({
                opt:"rename",
                oldTableName:oldTable.tableName,
                tableName:newTable.tableName
              })
            }
          }else{
            getEdit.logs.push({
              type:"success",
              info:"新增数据表名称为 【"+newTable.tableName+"】"
            })
            getEdit.updateOpts.push({
              opt:"addName",
              tableName:newTable.tableName
            })
          }
          //检测表所处位置变化

          //检测列信息变化
          for(var i=0;i<newTable.columnsData.length;i++){
            var newCol = newTable.columnsData[i]
            //检测输入列是否为空
            if(newCol.label==""){
              getEdit.logs = []
              getEdit.updateOpts = []
              getEdit.logs.push({
                type:"error",
                info:"存在列为空！"
              })
              this.canCommit = false
              return getEdit
            }
            //检测列是否重复
            var colRepeatCount = 0
            newTable.columnsData.forEach((col,i)=>{
              if(newCol.label == col.label){
                colRepeatCount++
              }
            })
            if(colRepeatCount>1){
              getEdit.logs = []
              getEdit.updateOpts = []
              getEdit.logs.push({
                type:"error",
                info:"列【"+newCol.label+"】出现重复！"
              })
              this.canCommit = false
              return getEdit
            }
            //检测选项是否为空
            if(newCol.type == "select" && newCol.items.length<1){
              getEdit.logs = []
              getEdit.updateOpts = []
              getEdit.logs.push({
                type:"error",
                info:"列【"+newCol.label+"】为可选项但选项为空！"
              })
              this.canCommit = false
              return getEdit
            }
            //比对改变
            let equalOldCol = null
            let equalIndex = -1
            if(oldTable){
              oldTable.columnsData.forEach((oldCol,j)=>{
                if(newCol.prop == oldCol.prop){
                  equalOldCol = oldCol
                  equalIndex = j
                }
              })
            }
            var newType = this.getColumnTypeStr(newCol.type)
            var newItemStr = ""
            if(newCol.type == "select"){
              newItemStr=this.getItemsStr(newCol.items)
            }
            if(equalOldCol){
              oldTable.columnsData.splice(equalIndex,1)
              var oldType = this.getColumnTypeStr(equalOldCol.type)
              var oldItemStr = ""
              if(equalOldCol.type == "select"){
                oldItemStr=this.getItemsStr(equalOldCol.items)
              }
              if(JSON.stringify(equalOldCol)!=JSON.stringify(newCol)){
                var info = "变更原列【"+equalOldCol.label+"】【"+oldType+"】"
                info+=oldItemStr==""?"":("包含选项【"+oldItemStr+"】")
                info+=" 为 【"+newCol.label+"】【"+newType+"】"
                info+=newItemStr==""?"":("包含选项【"+newItemStr+"】")
                getEdit.logs.push({
                  type:"warning",
                  info:info
                })
                getEdit.updateOpts.push({
                  opt:"edit",
                  oldCol:equalOldCol,
                  col:newCol
                })
              }
            }else{
              var info = "新增列【"+newCol.label+"】【"+newType+"】"
              info+=newItemStr==""?"":("包含选项【"+newItemStr+"】")
              getEdit.logs.push({
                type:"success",
                info:info
              })
              getEdit.updateOpts.push({
                opt:"add",
                col:newCol
              })
            }
          }
          //检测是否有删除列
          if(oldTable){
            oldTable.columnsData.forEach((oldCol,i)=>{
              var info = "删除列【"+oldCol.label+"】【"+this.getColumnTypeStr(oldCol.type)+"】"
              var delItemStr = ""
              if(oldCol.type == "select"){
                delItemStr=this.getItemsStr(oldCol.items)
              }
              info+=delItemStr==""?"":("包含选项【"+delItemStr+"】")
              getEdit.logs.push({
                type:"warning",
                info:info
              })
              getEdit.updateOpts.push({
                opt:"del",
                col:oldCol,
                index:i
              })
            })
          }
          return getEdit
        },
        getColumnTypeStr(type){
          for(var i=0;i<this.setp2Param.typeList.length;i++){
            var v = this.setp2Param.typeList[i]
            if(type == v.value){
              return v.label
            }
          }
        },
        getItemsStr(items){
          var itemStr = ""
          items.forEach((v,i)=>{
            itemStr+=v.value+","
          })
          return itemStr.substr(0,itemStr.length-1)
        }
      },
      computed:{
        prevDisabled(){
          return this.current==0?true:false
        },
        nextDisabled(){
          return (this.current==2||this.tableParam.tableName=="")?true:false
        },
        commitDisabled(){
          return (this.current==2&&this.canCommit)?false:true
        }
      }
    }
</script>
