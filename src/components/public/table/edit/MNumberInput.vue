<template>
  <Input-number v-model="v"></Input-number>
</template>

<script>
  export default {
    props:["name","value"],
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
