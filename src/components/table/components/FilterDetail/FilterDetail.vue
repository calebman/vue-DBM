<template>
  <div>
    &nbsp&nbsp符合以下
    <template v-if="filterParam.role=='and'">
      所有
    </template>
    <template v-else>
      任一
    </template>
    条件
    <br><br>
    <Table
      :columns="columns"
      :data="data"
      size="small"
      :show-header="false"
      no-data-text="暂无筛选条件"
      width="360"></Table>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          columns: [
            {
              title: '列名称',
              key: 'name',
              align:'center'
            },
            {
              title: '条件',
              key: 'role',
              align:'center'
            },
            {
              title: '内容',
              key: 'value',
              ellipsis:true,
              align:'center'
            }
          ]
        }
      },
      props:{
        filterParam:{
          default: function () {
            return {}
          }
        },
        tableColumnsData:Array
      },
      methods:{

      },
      computed:{
        //转化显示
        data:{
          get() {
            var filterItems = this.filterParam.filterData.domains
            var filterDatas = []
            var columnsData = this.tableColumnsData
            filterItems.forEach((value,index)=>{
              var colName = ""
              columnsData.forEach((col,jndex)=>{
                if(col["prop"] == value["role"][0]){
                  colName = col["label"]
                }
              })
              var roleName = ""
              switch (value["role"][1]){
                case 'equal': roleName="等于"
                  break
                case 'notEqual': roleName="不等于"
                  break
                case 'contain': roleName="包含"
                  break
                case 'notContain': roleName="不包含"
                  break
                case 'before': roleName="在日期之前"
                  break
                case 'after': roleName="在日期之后"
                  break
                case 'between': roleName="在日期之间"
                  break
                case '=': roleName="等于"
                  break
                case '>': roleName="大于"
                  break
                case '<': roleName="小于"
                  break
                case 'include': roleName="包含"
                  break
                case 'isNull': roleName="为空"
                  break
                case 'notNull': roleName="非空"
                  break
              }
              var roleValues = ""
              value["value"].forEach((roleValue,index)=>{
                roleValues+=roleValue+","
              })
              var length = roleValues.length
              roleValues = roleValues.substr(0,length-1)
              filterDatas.push({
                name:colName,
                role:roleName,
                value:roleValues
              })
            })
            return filterDatas
          }
        }
      }
    }
</script>
