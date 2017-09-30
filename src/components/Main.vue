<style>
  .demo-badge-alone{
    background: #2d8cf0 !important;
    color: #ffffff;
  }
</style>
<template>
  <div>
    <div>
      <Menu mode="horizontal" theme="primary" active-name="1" @on-select="selectMenu">
        <Row>
          <Col span="21">
          <Menu-item name="system">
            <Icon type="plane"></Icon>
            系统管理
          </Menu-item>
          <Menu-item name="data">
            <Icon type="stats-bars"></Icon>
            数据管理
          </Menu-item>
          </Col>
          </Col>
          <Col span="3">
            <Dropdown @on-click="handleDropdown">
              <div style="text-align: center">
                <Badge count="22" overflow-count="9" class-name="demo-badge-alone">
                  <Icon style="margin-right: 10px" type="person"  color="#ffffff" size="22"></Icon>
                </Badge>
                <span style="color:#ffffff;margin-left: 15px;margin-right: 4px;">{{loginInfo.realname}}</span>
                <Icon type="ios-arrow-down"  color="#ffffff" ></Icon>
              </div>
              <Dropdown-menu slot="list">
                <Dropdown-item disabled>{{loginInfo.nickName}}</Dropdown-item>
                <Dropdown-item disabled>{{loginInfo.username}}</Dropdown-item>
                <Dropdown-item name="updatePassword">修改密码</Dropdown-item>
                <Dropdown-item name="logout">注销</Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
          </Col>
        </Row>
      </Menu>
    </div>
    <div style="margin-top: 10px;overflow: auto; position:absolute; top:60px; bottom:30px;width: 100%">
      <container></container>
    </div>
    <div style="border:3px solid #dddee1;height: 30px; width:100%;position:fixed;bottom:0;">
      <Row>
        <Col span="3">
        <div style="border-right:2px solid #dddee1; height: 30px;width: 100%">
          <span style="float:left; padding:4px;font-size: 15px">您是 </span>
          <span style="float:left; padding:4px;font-size: 15px;color: #2d8cf0">{{loginInfo.nickName}}</span>
        </div>
        </Col>
        <Col span="13">
        <div style="border-right:2px solid #dddee1; height: 30px;width: 100%">
          <progressbar style="margin-top: 3px;margin-left: 3px;" :value="event.percent" :showText="event.detail" :max = 100></progressbar>
        </div>
        </Col>
        <Col span="4">
        <div style="border-right:2px solid #dddee1; height: 30px;width: 100%">
          <span style="float:left; padding:5px;font-size: 15px" id="time"></span>
        </div>
        </Col>
        <Col span="4">
        <div style="border-right:2px;height: 30px;width: 100%">
          <a style="float:left; padding:5px;font-size: 15px" :href="HOST+fastItem.url">{{fastItem.detail}}</a>
        </div>
        </Col>
      </Row>
    </div>
    <Modal
      v-model="showUpdate"
      title="修改密码"
      @on-ok="updatePassword">
      <Input v-model="updateInfo.password" type="password">
      <span slot="prepend">原密码：</span>
      </Input>
      <Input style="margin-top: 10px" v-model="updateInfo.newpassword" type="password">
      <span slot="prepend">新密码：</span>
      </Input>
    </Modal>
  </div>
</template>

<script>
  import Container from './framework/Container.vue'
  import progressbar from '../components/public/progress/Index.vue'
  export default {
    data() {
      return {
        showUpdate:false,
        updateInfo:{
          password:"",
          newpassword:""
        }
      }
    },
    components:{
      Container,progressbar
    },
    computed:{
      loginInfo:{
        get(){
          return this.$store.state.loginInfo
        },
        set(newValue){
          this.$store.state.loginInfo = newValue
        }
      },
      event:{
        get(){
          return this.$store.state.event
        }
      },
      notification:{
        get(){
          return this.$store.state.notification
        }
      },
      fastItem:{
        get(){
          return this.$store.state.fastItem
        }
      }
    },
    methods: {
      selectMenu(name){
        switch (name){
          case 'system':
            this.$store.commit('setShowMenu',0)
            break
          case 'data':
            this.$store.commit('setShowMenu',1)
            break
        }
      },
      handleDropdown(name){
        switch (name){
          case 'logout':
            this.$store.commit('clearLoginInfo')
            this.$router.push('/')
            this.$http.get(this.HOST+'/logout').then((response) => {
              if(response.status == 200){
                this.$Message.success('注销成功!')
              }
            })
            break
          case 'updatePassword':
            this.showUpdate = true
            break
        }
      },
      updatePassword(){
        this.$http.post(this.HOST+'/update',this.updateInfo).then((response) => {
          if(response.status == 200){
            this.$Message.success('密码修改成功!')
          }
        })
        this.updateInfo={
          password:"",
          newpassword:""
        }
      }
    },
    created() {
      let url = this.HOST+'/create'
      if(this.HOST=="static"){
        url+=".json"
      }
      this.$http.get(url).then((response) => {
        if(response.status == 200){
          this.$store.commit('setLoginInfo', response.body.data.loginInfo)
          this.$store.commit('setTableTree', response.body.data.tableTree)
        }
      })
      setInterval(function() {
        var date = new Date()
        var now = "当前时间："+date.getFullYear()
          +"-"+(date.getMonth()>9?date.getMonth():('0'+date.getMonth()))
          +"-"+(date.getDate()>9?date.getDate():('0'+date.getDate()))
          + " "+(date.getHours()>9?date.getHours():('0'+date.getHours()))
          +":"+(date.getMinutes()>9?date.getMinutes():('0'+date.getMinutes()))
          +":"+(date.getSeconds()>9?date.getSeconds():('0'+date.getSeconds()))
        if( document.getElementById("time")){
          document.getElementById("time").innerHTML = now
        }
      },1000);
    }
  }
</script>
