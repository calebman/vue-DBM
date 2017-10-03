<template>
  <div class="login_bg">
    <div class="loginPage">
      <h1>登录</h1>
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <Form-item label="用户名" prop="username">
          <Input type="text" v-model="formCustom.username"></Input>
        </Form-item>
        <Form-item label="密码" prop="password">
          <Input type="password" v-model="formCustom.password"></Input>
        </Form-item>
        <div style = "text-align:right;">
          <Button type="primary" @click="handleSubmit('formCustom')">登录</Button>
          <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </div>
      </Form>
      <br>
      <h3>用户名（超级管理员）/密码: admin/admin</h3>
    </div>
  </div>
</template>

<script>
    export default {
      data () {
        const validateUser = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('用户名不能为空'))
          }else{
            callback()
          }
        }
        const validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('密码不能为空'))
          }else{
            callback()
          }
        }
        return {
          formCustom: {
            username: '',
            password: ''
          },
          ruleCustom: {
            username: [
              { validator: validateUser, trigger: 'blur' }
            ],
            password: [
              { validator: validatePass, trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        handleSubmit (name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              var data = {
                username:this.formCustom.username,
                password:this.formCustom.password
              }
              this.$http.post(this.HOST+'/login',data).then((response) => {
                if(response.status == 200){
                  //存入seesion
                  window.sessionStorage.setItem("username",data.username)
                  window.sessionStorage.setItem("password",data.password)
                  window.sessionStorage.setItem("token",true)
                  this.$router.push('/main')
                  this.$Message.success('登录成功!')
                }
              })
            } else {
              this.$Message.error('提交内容有误!')
            }
          })
        },
        handleReset (name) {
          this.$refs[name].resetFields()
        }
      }
    }
</script>

<style scoped>
  html,body{
    margin: 0;
    padding: 0;
    position: relative;
  }
  .login_bg{
    position: absolute;
    background: url(../assets/login-bg.png)0 0 repeat-x;
    width: 100%;
    height: 100%;
  }
  .loginPage{
    position: absolute;
    background: #dde6ea;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -175px;
    width: 350px;
    min-height: 200px;
    padding: 30px 20px 20px;
    border-radius: 8px;
    box-sizing: border-box;
  }
</style>
