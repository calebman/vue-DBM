<template>
  <div style="margin-left: 5px">
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>

    <el-tree
      class="filter-tree"
      :data="tableTree"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
      ref="tree">
    </el-tree>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleNodeClick(nodeData) {
        if(nodeData.children.length == 0 ){
          this.$http.get(this.HOST+'/admin/data/table/'+nodeData.label+'/create').then((response) => {
            if(response.status == 200){
              var data = response.body.data
              var tableParam = {
                name:nodeData.id+"",
                label:nodeData.label,
                type:'data',
                info:{
                  tableName:data.tableName,
                  tableData:data.tableData,
                  columns:data.columns,
                  configs:data.configs,
                  pagination:data.pagination
                },
                active:true
              }
              this.$store.commit('addTabItem', tableParam)
            }
          })
        }
      }
    },
    data() {
      return {
        filterText: ''
      }
    },
    computed:{
      tableTree:{
        get(){
          return this.$store.state.tableTree
        },
        set(newValue){
          this.$store.state.tableTree = newValue
        }
      }
    }
  }
</script>
