<template>
  <Select v-model="v" clearable placeholder="请选择">
    <Option v-for="item in items" :value="item.value" :key="item.value">{{ item.value }}</Option>
  </Select>
</template>

<script>
  export default{
    props:["items","name","value"],
    data () {
      return {
        v:this.value
      }
    },
    watch:{
      value(val){
        this.v = val
      },
      v(val){
        this.$emit('input',val)
        this.$emit("onValueChange",this.name,val)
      }
    }
  }
</script>
