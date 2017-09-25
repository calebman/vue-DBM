<template>
  <div style="margin-left: 5px;">
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>
    <el-tree
      class="filter-tree"
      style="overflow:auto;"
      :data="treeData"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
      ref="tree"
      node-key="value"
      :expand-on-click-node="false"
      :render-content="renderContent"
      default-expand-all>
    </el-tree>
    <Button  style="margin-top: 10px" type="info" @click="addNode" long>添加根目录</Button>
  </div>
</template>

<script>
  import TreeItem from './TreeItem.vue'
  export default {
    data() {
      return {
        filterText: '',
        treeData:this.value,
        runParam:{}
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
        this.treeData.splice(0,0,{
          value:this.$utilHelper.generateUUID(),
          label: '请输入模块名称',
          children: [],
          status:1,
          isAdd:true
        })
      },
      handleNodeClick(nodeData) {
        this.$emit('NodeClick',nodeData)
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
            //删除节点
            Delete: (nodeData) => {
              //递归查找父节点
              var parentNode = this.$utilHelper.getNode(this.treeData,data.value).parentNode
              this.runParam.parentNode = parentNode
              this.runParam.data = data
              this.runParam.nodeData = nodeData
              this.$emit('DelNode',parentNode,data,this.CanDelNext)

            },
            //保存节点
            SaveEdit:(nodeData)=> {
              //递归查找父节点
              var parentNode = this.$utilHelper.getNode(this.treeData,data.value).parentNode
              this.runParam.parentNode = parentNode
              this.runParam.data = data
              this.runParam.nodeData = nodeData
              this.$emit('SaveEdit',parentNode,data,this.CanSaveNext)
            },
            //撤销修改
            CancelEdit:(nodeData)=>{
              //递归查找父节点
              var parentNode = this.$utilHelper.getNode(this.treeData,data.value).parentNode
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
      },
      CanSaveNext(isNext,nodeId){
        let parentNode = this.runParam.parentNode
        let nodeData = this.runParam.nodeData
        let data = this.runParam.data
        if(isNext){
          parentNode.children.forEach((v,i)=>{
            if(v.value == data.value){
              if(this.HOST != "static"&&data.isAdd){
                data.value = nodeId
              }
              data.status = 0
              parentNode.children.splice(i,1,data)
            }
          })
        }else{
          if(!data.isAdd){
            parentNode.children.forEach((v,i)=>{
              if(v.value == nodeData.value){
                data.label = nodeData.label
                parentNode.children.splice(i,1,data)
              }
            })
          }
        }
        this.runParam = {}
      },
      CanDelNext(isNext){
        let parentNode = this.runParam.parentNode
        let nodeData = this.runParam.nodeData
        let data = this.runParam.data
        if(isNext){
          parentNode.children.forEach((v,i)=>{
            if(v.value == data.value){
              parentNode.children.splice(i,1)
            }
          })
        }
        this.runParam = {}
      }
    },
    props:{
      value:Array
    },
    watch:{
      value:{
        handler:function(val,oldVal){
          this.treeData = val
        },
        deep:true
      },
      treeData:{
        handler:function(val){
          this.$emit('input',val)
        },
        deep:true
      }
    },
    components:{
      TreeItem
    }
  }
</script>
