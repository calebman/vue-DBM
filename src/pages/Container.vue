<template>
  <div style="margin-right: 16px">
    <Row :gutter="16">
      <Col span="4">
      <template v-if="showNavMenu == 0">
        <nav-menu></nav-menu>
      </template>
      <template v-if="showNavMenu == 1">
        <m-tree
          v-model="tableTree"
          @SaveEdit="SaveEdit"
          @DelNode="DelNode"
          @NodeClick="handleNodeClick"></m-tree>
      </template>
      </Col>
      <Col span="20">
        <Tabs type="card" animated=false size="small" :animated="false" :value="tabParams.activeName" @on-tab-remove="handleTabRemove">
          <Tab-pane name="home" icon="ios-home" label="主页">
            <home-page></home-page>
          </Tab-pane>
          <Tab-pane closable v-for="item in tabParams.tabItems" v-if="item.active" :name="item.name" :label="item.label">
            <template v-if="item.type == 'data'">
              <m-table
                v-model="item.info"></m-table>
            </template>
            <template v-else-if="item.type == 'role'">
              <role-page
                :_mockData="item.info.roles"
                :_roleInfos="item.info.roleInfos"></role-page>
            </template>
            <template v-else-if="item.type == 'user'">
              <user-page
                :_userInfos="item.info.users"
                :_roles="item.info.roles"></user-page>
            </template>
            <template v-else-if="item.type == 'table'">
              <table-page :_tableInfos="item.info.tableInfos"></table-page>
            </template>
            <template v-else>

            </template>
          </Tab-pane>
        </Tabs>
      </Col>
    </Row>
  </div>
</template>

<script>
  import MTable from '../components/table/MTable.vue'
  import HomePage from '../pages/HomePage.vue'
  import NavMenu from './framework/NavMenu.vue'
  import MTree from '../components/tree/MTree.vue'
  import RolePage from './system/role/RolePage.vue'
  import UserPage from './system/user/UserPage.vue'
  import TablePage from './system/data/TablePage.vue'
  export default {
    data() {
      return {

      }
    },
    components:{
      MTable, HomePage, NavMenu, MTree, RolePage, UserPage, TablePage
    },
    computed:{
      showNavMenu:{
        get(){
          return this.$store.state.showNavMenu
        },
        set(newValue){
          this.$store.state.showNavMenu = newValue
        }
      },
      tabParams:{
        get(){
          return this.$store.state.tabParams
        },
        set(newValue){
          this.$store.state.tabParams = newValue
        }
      },
      tableTree:{
        get(){
          return this.$store.state.tableTree
        },
        set(newValue){
          this.$store.state.tableTree = newValue
        }
      }
    },
    methods:{
      handleTabRemove(name){
        this.$store.commit('removeTabItem', name)
      },
      handleNodeClick(nodeData){
        if(nodeData.status == -1 ){
          this.$http.get(this.HOST+'/admin/data/table/'+nodeData.label+'/create').then((response) => {
            if(response.status == 200){
              var data = response.body.data
              var tableParam = {
                name:nodeData.id+"",
                label:nodeData.label,
                type:'data',
                info:data,
                active:true
              }
              this.$store.commit('addTabItem', tableParam)
            }
          })
        }
      },
      SaveEdit(parentNode,data,next){
        var param = {
          isAdd:data.isAdd,
          parentNode:parentNode,
          node:data
        }
        this.$http.post(this.HOST+'/admin/system/tree/edit',param).then((response) => {
          if(response.status == 200){
            next(true,response.body.data.tid)
          }
        })
      },
      DelNode(parentNode,data,next){
        var param = {
          parentNode:parentNode,
          node:data
        }
        this.$http.post(this.HOST+'/admin/system/tree/del',param).then((response) => {
          if(response.status == 200){
            next(true)
          }
        })
      }
    }
  }
</script>
