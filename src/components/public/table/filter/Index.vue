<template>
  <Modal
    title="构建筛选条件"
    v-model="param.visible"
    @on-ok="commit"
    @on-cancel="closeDialog">
    <Form  :model="param.filterData" ref="filterDialog">
      筛选出符合下面&nbsp&nbsp
      <Select v-model="param.role" size="small" style="width:75px">
        <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      &nbsp&nbsp条件的数据
      <br><br>
      <Form-item
        v-for="(domain, index) in param.filterData.domains"
        :key="index">
        <Row>
          <Col>
          <div>
            <Cascader trigger="hover" v-model="domain.role"  :data="options" @on-change="changeValue(domain)" style="width: 150px"></Cascader>
            <template v-if="domain.role[1] == 'before' || domain.role[1] == 'after'">
              <Date-picker type="datetime" :options="options1" placeholder="请选择" v-model="domain.value[0]" format="yyyy-MM-dd HH:mm:ss" style="width: 250px" @on-change="domain.value[0]=$event"></Date-picker>
            </template>
            <template v-else-if="domain.role[1] == 'between'">
              <Date-picker type="datetimerange" :options="options2" placement="bottom-end" placeholder="请选择" v-model="domain.value" format="yyyy-MM-dd HH:mm:ss" style="width: 250px" @on-change="domain.value=$event"></Date-picker>
            </template>
            <template v-else-if="domain.role[1] == '>' || domain.role[1] == '<' || domain.role[1] == '='">
              <Input-number v-model="domain.value[0]" style="width:150px;"></Input-number>
            </template>
            <template v-else-if="domain.role[1] == 'equal' || domain.role[1] == 'contain' || domain.role[1] == 'notEqual' || domain.role[1] == 'notContain'">
              <Input v-model="domain.value[0]" icon="ios-clock-outline" placeholder="请输入..." style="width: 150px"></Input>
            </template>
            <template v-else-if="domain.role[1] == 'include'">
              <template v-for="col in tableColumnsData" v-if="col.prop == domain.role[0]">
                <Select v-model="domain.value" filterable multiple placeholder="请选择" style="width:250px;">
                  <Option v-for="item in col.items" :value="item.value" :key="item.value">{{ item.value }}</Option>
                </Select>
              </template>
            </template>
            <Button type="ghost" shape="circle" icon="minus" size="small"  @click="removeDomain(index)" style="margin-left: 10px;"></Button>
          </div>
          </Col>
        </Row>
      </Form-item>

      <Form-item>
        <Button icon="plus-round" type="primary" size="small" @click="addDomain">新增条件</Button>
      </Form-item>

    </Form>
  </Modal>
</template>

<script>
  export default {
    data() {
      return {
        param:this.filterParam,
        role:"and",
        roleList: [
          {
            value: 'and',
            label: '所有'
          },
          {
            value: 'or',
            label: '任一'
          }
        ],
        options1: {
          shortcuts: [
            {
              text: '今天',
              value () {
                return new Date();
              }
            },
            {
              text: '昨天',
              value () {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                return date;
              }
            },
            {
              text: '一周前',
              value () {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                return date;
              }
            }
          ]
        },
        options2: {
          shortcuts: [
            {
              text: '最近一周',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              }
            },
            {
              text: '最近一个月',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            },
            {
              text: '最近三个月',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
              }
            }
          ]
        }
      }
    },
    props:{
      tableColumnsData:Array,
      filterUrl:String,
      tableName:String,
      filterParam:{
        default: function () {
          return {
            filterData:{
              domains:[]
            },
            role:String,
            visible:false
          }
        }
      }
    },
    methods: {
      //提交修改申请
      commit(){
        this.closeDialog()
        var params = {
          columns:this.tableColumnsData,
          filter:this.param.filterData.domains,
          isOr:this.param.role=="and"?false:true,
          pageSize: 30,
          pageCurrent: 1
        }
        this.$emit("onFilterSuccess",params,this.param)
      },
      //关闭对话款
      closeDialog(){
        var doms = this.param.filterData.domains
        var clearCount = 0
        doms.forEach((domain,index)=>{
          if(domain.role[0]==''||domain.role[1]==''){
            clearCount++
          }
        })
        if(clearCount>0){
          for(var i=0;i<clearCount;i++){
            for(var j=0;j<doms.length;j++){
              var domain = doms[j]
              if(domain.role[0]==''||domain.role[1]==''){
                doms.splice(j,1)
              }
            }
          }
          this.$Message.info("已自动清除"+this.tableName+"的不合法筛选项")
        }
        this.visible = false
      },
      //重置所有筛选
      resetForm() {
        this.param.filterData.domains = []
      },
      //移除某个筛选
      removeDomain(index) {
        this.param.filterData.domains.splice(index, 1)
      },
      //添加筛选并赋初始值
      addDomain() {
        this.param.filterData.domains.push({
          role:['',''],
          value:[]
        })
      },
      //根据选中重置value
      changeValue(domain){
        var items = domain.value
        items.splice(0,items.length)
        if(domain.role[1] == '>' || domain.role[1] == '<' || domain.role[1] == '='){
          items.push(0)
        }
      },
      //构建筛选选项
      createOptions(cols){
        var opt = []
        cols.forEach((item,i)=>{
          var children = []
          switch (item.type) {
            case 'text':
              children.push({value: 'equal', label: '等于'})
              children.push({value: 'notEqual', label: '不等于'})
              children.push({value: 'contain', label: '包含'})
              children.push({value: 'notContain', label: '不包含'})
              break;
            case 'date':
              children.push({value: 'before', label: '在此之前'})
              children.push({value: 'after', label: '在此之后'})
              children.push({value: 'between', label: '时间段'})
              break;
            case 'number':
              children.push({value: '=', label: '等于'})
              children.push({value: '>', label: '大于'})
              children.push({value: '<', label: '小于'})
              break;
            case 'select':
              children.push({value: 'include', label: '包括'})
              break;
            case 'img':
              children.push({value: 'isNull', label: '为空'})
              children.push({value: 'notNull', label: '非空'})
              break;
          }
          opt.push({
            value: item.prop,
            label: item.label,
            children: children
          })
        })
        return opt
      }
    },
    computed: {
      options(){
        return this.createOptions(this.tableColumnsData)
      }
    },
    watch:{

    }
  }
</script>
