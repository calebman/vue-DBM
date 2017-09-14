<template>
  <Modal v-model="v" width="360">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="information-circled"></Icon>
      <span>删除确认</span>
    </p>
    <div style="text-align:center">
      <p>此角色删除后，将有{{roleInfo.relevantUserCount}}个用户受影响。</p>
      <p>是否继续删除？</p>
    </div>
    <div slot="footer">
      <Button type="error" size="large" long @click="confirm">删除</Button>
    </div>
  </Modal>
</template>

<script>
    export default {
      data () {
        return {
          v:this.value
        }
      },
      props:{
        value:Boolean,
        roleInfo:{
          type: Object,
          default() {
            return {}
          }
        }
      },
      watch:{
        v(val){
          this.$emit('input',val)
        },
        value(val){
          this.v = val
        }
      },
      methods:{
        confirm(){
          this.closeDialog()
          var row = this.roleInfo
          var data = {
            roleCode:row.roleCode
          }
          this.$http.post(this.HOST+'/admin/system/role/del',data).then((response) => {
            if(response.status == 200){
              this.$emit('onSuccess',row)
            }
          })
        },
        closeDialog(){
          this.v = false
        }
      }
    }
</script>
