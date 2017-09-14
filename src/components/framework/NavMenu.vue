<template>
  <Menu @on-select="selectMenu" width="auto">
    <MenuGroup title="系统管理">
      <Menu-item name="role">
        <Icon type="ios-people"></Icon>
        角色管理
      </Menu-item>
      <Menu-item name="user">
        <Icon type="ios-person"></Icon>
        用户管理
      </Menu-item>
    </MenuGroup>
    <MenuGroup title="表格管理">
      <Menu-item name="table">
        <Icon type="stats-bars"></Icon>
        数据表格
      </Menu-item>
    </MenuGroup>
    <MenuGroup title="日志管理">
      <Menu-item name="log">
        <Icon type="log-in"></Icon>
        操作日志
      </Menu-item>
    </MenuGroup>
  </Menu>
</template>
<script>
  export default{
    methods: {
      selectMenu(name){
        var tabItem = {
          name:'',
          label:'',
          type:'',
          info:{},
          active:true
        }
        switch (name){
          case 'role':
            tabItem.name = '/admin/system/role/create'
            tabItem.type = 'role'
            tabItem.label = '角色管理'
            break
          case 'user':
            tabItem.name = '/admin/system/user/create'
            tabItem.type = 'user'
            tabItem.label = '用户管理'
            break
          case 'table':
            tabItem.name = '/admin/system/table/create'
            tabItem.type = 'table'
            tabItem.label = '表格管理'
            break
          case 'set4':
            tabItem.type = 'system'
            break
        }
        this.$http.get(this.HOST+tabItem.name).then((response) => {
          if(response.status == 200){
            var data = response.body.data
            tabItem.info = data
            console.log(JSON.stringify(tabItem.info))
            this.$store.commit('addTabItem', tabItem)
          }
        })
      }
    }
  }
</script>
