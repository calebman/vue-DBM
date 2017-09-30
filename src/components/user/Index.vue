<template>
  <div style="min-height: 300px">
    <Row type="flex" justify="end" style="margin-right: 30px">
      <Col>
      <Button type="primary" icon="plus-circled" @click="createUser">新建用户</Button>
      </Col>
    </Row>
    <Row style="margin-top: 10px">
      <Col>
      <Table
        :columns="userCoumns"
        :data="userInfos"
        size="large"></Table>
      </Col>
    </Row>
    <Modal
      v-model="showAdd"
      title="添加用户"
      @on-ok="clickAddUser">
      <Input type="text" v-model="addUser.username" size="large" placeholder="管理员账号" style="margin-top: 10px">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
      <Input type="text" v-model="addUser.realname" size="large" placeholder="管理员姓名" style="margin-top: 10px"  >
      <Icon type="android-create" slot="prepend"></Icon>
      </Input>
      <Input type="text" placeholder="管理员密码" size="large" disabled :value="'123456'" style="margin-top: 10px">
      <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </Modal>
  </div>

</template>
<script>
  import UserTag from "./UserTag.vue"
  import SwitchEnabled from "./SwitchEnabled.vue"
  export default {
    data () {
      return {
        roles: this._roles,
        userInfos:JSON.parse(JSON.stringify(this._userInfos)),
        showAdd:false,
        addUser:{
          username:"",
          realname:""
        },
        userCoumns:[
          {
            title: '用户账号',
            key: 'username',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.username)
              ])
            }
          },
          {
            title: '用户姓名',
            key: 'realname'
          },
          {
            title: '用户角色',
            key: 'nickName',
            render: (h, params) => {
              return h('div', [
                h(UserTag,{
                  props:{
                    _roleCode:params.row.roleCode,
                    _userCode:params.row.userCode,
                    _roles:this.roles
                  },
                  on:{
                    onRoleSuccess:this.onRoleChange
                  }
                })
              ])
            }
          },
          {
            title: '是否启用',
            key: 'isUse',
            render: (h, params) => {
              return h('div', [
                h(SwitchEnabled,{
                  props:{
                    userCode:params.row.userCode,
                    _isUse:params.row.isUse
                  },
                  on:{
                    onAbledSuccess:this.onUserEnabled
                  }
                })
              ])
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.delUser(params.row.userCode)
                    }
                  }
                }, '删除用户')
              ]);
            }
          }
        ]
      }
    },
    computed: {

    },
    components:{
      UserTag, SwitchEnabled
    },
    methods: {
      createUser(){
        this.showAdd = true
      },
      clickAddUser(){
        this.showAdd = false
        var username = this.addUser.username
        var realname = this.addUser.realname
        this.addUser = {
          username:"",
          realname:""
        }
        this.$http.post(this.HOST+'/admin/system/user/add',this.addUser).then((response) => {
          if(response.status == 200){
            this.userInfos.push({
              userCode:response.body.data,
              username:username,
              realname:realname,
              isUse:false,
              nickName:"",
              roleCode:null
            })
            this.$Notice.success({title: '用户操作', desc: '添加用户成功'})
          }
        })
      },
      onUserEnabled(userCode,enabled){
        var _userInfos = this.userInfos
        _userInfos.forEach((value,index)=>{
          if(value.userCode == userCode){
            value.isUse = enabled
            _userInfos.splice(index,1,value)
          }
        })
      },
      onRoleChange(userCode,roleCode){
        var _userInfos = this.userInfos
        _userInfos.forEach((value,index)=>{
          if(value.userCode == userCode){
            value.roleCode = roleCode
            _userInfos.splice(index,1,value)
          }
        })
      },
      delUser(userCode){
        var data = {
          userCode:userCode
        }
        this.$http.post(this.HOST+'/admin/system/user/del',data).then((response) => {
          if(response.status == 200){
            var _userInfos = this.userInfos
            _userInfos.forEach((value,index)=>{
              if(value.userCode == userCode){
                _userInfos.splice(index,1)
              }
            })
            this.$Notice.success({title: '用户操作', desc: '删除用户成功'})
          }
        })
      }
    },
    props:{
      _userInfos:Array,
      _roles:Array
    }
  }
</script>

<style>

</style>
