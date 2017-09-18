<template>
  <Date-picker v-model="v" type="date" placeholder="请选择时间" format="yyyy-MM-dd HH:mm:ss" @on-change="format"></Date-picker>
</template>
<script>
    export default {
        data(){
            return{
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
        },
        methods:{
          format(val){
            this.v = val
          }
        },
        props:["name","value"]
    }
</script>
