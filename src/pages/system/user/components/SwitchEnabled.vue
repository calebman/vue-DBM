<template>
  <i-switch v-model="isUse" size="large" @on-change="userAbled">
    <span slot="open">启用</span>
    <span slot="close">禁用</span>
  </i-switch>
</template>

<script>
    export default {
      data () {
        return {
          isUse:this._isUse
        }
      },
      props:{
        userCode:"",
        _isUse:false
      },
      methods: {
        userAbled(abled) {
          var data = {
            userCode: this.userCode
          }
          if (abled) {
            this.$http.post(this.HOST + '/admin/system/user/enabled', data).then((response) => {
              if (response.status == 200) {
                this.$emit('onAbledSuccess', data.userCode, true)
              }else{
                this.isUse = false
              }
            })
          } else {
            this.$http.post(this.HOST + '/admin/system/user/disabled', data).then((response) => {
              if (response.status == 200) {
                this.$emit('onAbledSuccess', data.userCode, false)
              }else{
                this.isUse = true
              }
            })
          }
        }
      }
    }
</script>
