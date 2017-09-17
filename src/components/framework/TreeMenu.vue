<template>
  <div style="margin-left: 5px;">
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>
    <Button  style="margin-bottom: 5px" type="success" @click="addNode" long>新增根节点</Button>
    <el-tree
      class="filter-tree"
      style="overflow:auto;"
      :data="tableTree"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
      ref="tree"
      node-key="value"
      :expand-on-click-node="false"
      :render-content="renderContent"
      default-expand-all>
    </el-tree>
  </div>
</template>

<script>
  import TreeItem from  '../framework/TreeItem.vue'
  export default {
    data() {
      return {
        filterText: ''
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
      addNode(){
        this.tableTree.splice(0,0,{
          value:this.$utilHelper.generateUUID(),
          label: '请输入模块名称',
          children: [],
          status:1,
          isAdd:true
        })
      },
      handleNodeClick(nodeData) {
        if(nodeData.status == -1 ){
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
      },
      renderContent(h, { node, data, store }) {
        return h(TreeItem,{
          props:{
            value:data,
            treeNode:node
          },
          on:{
            input:(node)=>{
              data = node
            },
            Append: () => {
              node.expanded = true
              data.children.push({ value: this.$utilHelper.generateUUID(), label: '请输入模块名称', children: [],status:1,isAdd:true })
            },
            Delete: (nodeData) => {
              var parentNode = this.$utilHelper.getNode(this.tableTree,data.value).parentNode
              var param = {
                parentNode:parentNode,
                node:data
              }
              this.$http.post(this.HOST+'/admin/system/tree/del',param).then((response) => {
                if(response.status == 200){
                  parentNode.children.forEach((v,i)=>{
                    if(v.value == data.value){
                      parentNode.children.splice(i,1)
                    }
                  })
                }
              })
            },
            SaveEdit:(nodeData)=> {
              var parentNode = this.$utilHelper.getNode(this.tableTree,data.value).parentNode
              var param = {
                isAdd:data.isAdd,
                parentNode:parentNode,
                node:data
              }
              this.$http.post(this.HOST+'/admin/system/tree/edit',param).then((response) => {
                if(response.status == 200){
                  if(this.HOST == "static"){
                    data.value = this.$utilHelper.generateUUID()
                  }else{
                    data.value = response.body.data.tid
                  }
                }else{
                  parentNode.children.forEach((v,i)=>{
                    if(v.value == nodeData.value){
                      parentNode.children.splice(i,1,nodeData)
                    }
                  })
                }
              })
            },
            CancelEdit:(nodeData)=>{
              var parentNode = this.$utilHelper.getNode(this.tableTree,data.value).parentNode
              if(data.isAdd){
                parentNode.children.forEach((v,i)=>{
                  if(v.value == data.value){
                    parentNode.children.splice(i,1)
                  }
                })
              }else{
                parentNode.children.forEach((v,i)=>{
                  if(v.value == data.value){
                    parentNode.children.splice(i,1,JSON.parse(JSON.stringify(nodeData)))
                  }
                })
              }
            }
          }
        })
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
    },
    components:{
      TreeItem
    }
  }
</script>
