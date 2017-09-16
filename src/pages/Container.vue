<template>
  <div style="margin-right: 16px">
    <Row :gutter="16">
      <Col span="4">
      <template v-if="showNavMenu == 0">
        <nav-menu></nav-menu>
      </template>
      <template v-if="showNavMenu == 1">
        <tree-menu></tree-menu>
      </template>
      </Col>
      <Col span="20">
        <Tabs type="card" animated=false size="small" :animated="false" :value="tabParams.activeName" @on-tab-remove="handleTabRemove">
          <Tab-pane name="home" icon="ios-home" label="主页">
            <home-page></home-page>
          </Tab-pane>
          <Tab-pane closable v-for="item in tabParams.tabItems" v-if="item.active" :name="item.name" :label="item.label">
            <template v-if="item.type == 'data'">
              <my-table
                :_tableName="item.info.tableName"
                :_tableData="item.info.tableData"
                :_columns="item.info.columns"
                :_configs="item.info.configs"
                :_pagination="item.info.pagination"></my-table>
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
  import MyTable from '../components/table/MyTable.vue'
  import HomePage from '../pages/HomePage.vue'
  import NavMenu from '../components/framework/NavMenu.vue'
  import TreeMenu from '../components/framework/TreeMenu.vue'
  import RolePage from './system/role/RolePage.vue'
  import UserPage from './system/user/UserPage.vue'
  import TablePage from './system/data/TablePage.vue'
  export default {
    data() {
      return {

      }
    },
    components:{
      MyTable, HomePage, NavMenu, TreeMenu, RolePage, UserPage, TablePage
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
      }
    },
    methods:{
      handleTabRemove(name){
        this.$store.commit('removeTabItem', name)
      }
    }
  }
</script>
