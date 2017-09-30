<template>
  <div>
    <Select v-model="roleCode" style="width: 200px" @on-change="changeRole">
      <Option v-for="item in _roles" :value="item.roleCode" :key="item.roleCode">{{ item.nickName }}</Option>
    </Select>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        roleCode:this._roleCode
      }
    },
    props:{
      _userCode:Number,
      _roleCode:Number,
      _roles:Array
    },
    methods:{
      changeRole(value){
        var data = {
          userCode:this._userCode,
          roleCode:this.roleCode
        }
        this.$http.post(this.HOST+'/admin/system/user/edit',data).then((response) => {
          if(response.status == 200){
            this.$emit('onRoleSuccess', data.userCode, data.roleCode)
            this.$Message.success('修改角色成功!')
          }
        })
      }
    },
    computed: {
    }
  }
</script>
