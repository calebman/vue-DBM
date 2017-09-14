<template>
  <div>
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

  </div>

</template>
<script>
  import UserTag from "./components/UserTag.vue"
  import SwitchEnabled from "./components/SwitchEnabled.vue"
  export default {
    data () {
      return {
        roles: this._roles,
        userInfos:this._userInfos,
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
                    data:params.row.nickName==null?"尚无角色":params.row.nickName,
                    color:params.row.nickName==null?"":"blue"
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
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.editUser(params.row)
                    }
                  }
                }, '编辑'),
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
                }, '删除')
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
      editUser(){

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
