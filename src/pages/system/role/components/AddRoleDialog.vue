<template>
  <Modal v-model="v"
         @on-cancel="closeDialog">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="information-circled"></Icon>
      <span>添加一个角色</span>
    </p>
    <div>
      <Form :model="roleInfo">
        <Form-item prop="nickname">
          <Input type="text" v-model="roleInfo.nickName" placeholder="请输入角色名称">
          <Icon type="ios-people" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="description">
          <Input type="text" v-model="roleInfo.description" placeholder="请输入角色描述">
          <Icon type="ios-list-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
      </Form>
    </div>
    <div slot="footer">
      <Button type="info" size="large" long @click="confirm()">确认</Button>
    </div>
  </Modal>
</template>

<script>
    export default {
      data () {
        return {
          roleInfo:{
            nickName:"",
            description:""
          },
          v:this.value
        }
      },
      props:{
        value:Boolean
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
          var roleData = this.roleInfo
          if(roleData.nickName == ''){
            this.$Message.warning("角色名称不能为空")
          }else{
            this.closeDialog()
            var data = {
              nickName:roleData.nickName,
              description:roleData.description,
              roles:[]
            }
            this.$http.post(this.HOST+'/admin/system/role/add',data).then((response) => {
              if(response.status == 200){
                data.roleCode = response.body.data
                this.$emit('onSuccess',data)
              }
            })
          }
        },
        closeDialog(){
          this.roleInfo = {
            roleCode:"",
            nickName:"",
            description:"",
            roles:[]
          }
          this.v = false
        }
      }
    }
</script>
