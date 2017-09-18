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
          <Col span="3">
          <Dropdown style="margin-left: 20px" @on-click="handleDropdown">
            <div>
              <Icon type="android-person" color="#ffffff" ></Icon>
              <span style="color:#ffffff;margin-left: 6px;margin-right: 4px;">{{loginInfo.realname}}</span>
              <Icon type="ios-arrow-down"  color="#ffffff" ></Icon>
            </div>
            <Dropdown-menu slot="list">
              <Dropdown-item disabled>{{loginInfo.nickName}}</Dropdown-item>
              <Dropdown-item disabled>{{loginInfo.username}}</Dropdown-item>
              <Dropdown-item name="logout">注销</Dropdown-item>
              <Dropdown-item name="setting">设置</Dropdown-item>
            </Dropdown-menu>
          </Dropdown>
          </Col>
        </Row>
      </Menu>
    </div>
    <div style="margin-top: 10px">
      <container></container>
    </div>
  </div>
</template>

<script>
  import Container from './Container.vue'
  export default {
    data() {
      return {

      }
    },
    components:{
      Container
    },
    computed:{
      loginInfo:{
        get(){
          return this.$store.state.loginInfo
        },
        set(newValue){
          this.$store.state.loginInfo = newValue
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
          case 'setting':

            break
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
    }
  }
</script>
