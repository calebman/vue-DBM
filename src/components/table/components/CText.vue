<template>
  <Input v-model="v" placeholder="请输入..." size="small"></Input>
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
