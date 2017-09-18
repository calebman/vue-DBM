<template>
  <span class="span_item">
    <span @click="Expanded">
      <Input v-if="node.status == 1" style="width: 100px;" v-model="node.label" size="small" ></Input>
      <Icon  v-if="node.status == 0" type="asterisk"></Icon>
      <Icon v-if="node.status == -1" type="ios-keypad-outline"></Icon>
      <span v-if="node.status != 1">{{node.label}}</span>
    </span>
    <span v-if="node.status == 1">
      <Button  style="margin-left: 8px;" size="small" type="success" icon="checkmark-circled" @click="SaveEdit">确认</Button>
      <Button style="margin-left: 8px;" size="small" type="ghost" icon="checkmark-circled" @click="CancelEdit">取消</Button>
    </span>
    <span class="span_icon">
       <Icon v-if="node.status == 0" style="margin-left: 8px" color="gray" type="edit" size="16" @click.native="OpenEdit"></Icon>
       <Icon v-if="node.status == 0" style="margin-left: 8px" type="plus-round" color="gray" size="16" @click.native="Append"></Icon>
       <Icon v-if="node.status == 0&&node.children.length < 1" style="margin-left: 8px" type="ios-trash" color="red" size="18" @click.native="Delete"></Icon>
    </span>
  </span>
</template>

<script>
    export default {
      data() {
        return {
          node:this.value,
          nodeData:JSON.parse(JSON.stringify(this.value))
        }
      },
      props:{
        value:{
          default: function () {
            return {}
          }
        },
        treeNode:{
          default: function () {
            return {}
          }
        }
      },
      methods:{
        OpenEdit(){
          this.node.status = 1
          this.node.isAdd = false
        },
        Append(){
          this.$emit('Append')
        },
        SaveEdit(){
          this.$emit('SaveEdit',this.nodeData)
        },
        CancelEdit(){
          this.node.status = 0
          this.$emit('CancelEdit',this.nodeData)
        },
        Delete(){
          this.$emit('Delete',this.nodeData)
        },
        Expanded(){
          this.treeNode.expanded = this.treeNode.expanded?false:true
        }
      },
      watch:{
        value:{
          handler:function(val,oldVal){
            this.node = val
          },
          deep:true
        },
        node:{
          handler:function(val){
            this.$emit('input',val)
          },
          deep:true
        }
      }
    }
</script>
<style>
  .span_item:hover .span_icon {
    display: inline;
  }
  .span_icon {
    margin-left: 10px;
    display: none;
  }
</style>
