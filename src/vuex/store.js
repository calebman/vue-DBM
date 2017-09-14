import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    //作者名称
    author: 'CJH',
    //登录信息
    loginInfo:{
      username:"",
      password:"",
      realname:"",
      nickname:"",
      roles:[],
      token:false
    },
    //菜单切换项
    showNavMenu:0,
    //表格树
    tableTree:[],
    //标签页参数
    tabParams:{
      //激活的标签页
      activeName:"home",
      //激活的标签页的堆栈
      activeNameList:["home"],
      //标签页内容
      tabItems:[]
    }
  },
  mutations:{
    //设置表格树
    setTableTree(state,data){
      state.tableTree = data
    },
    //设置登录信息
    setLoginInfo(state,data){
      state.loginInfo = data
    },
    //清空登录信息，重置状态机
    clearLoginInfo(state){
      state.loginInfo = {
        username: '',
        password: '',
        realname: '',
        nickname: '',
        roles:[],
        token: false
      }
      state.tableTree = []
      state.tabParams={
        activeName:"home",
        activeNameList:["home"],
        tabItems:[]
      }
    },
    //切换显示的菜单
    setShowMenu(state,data){
      state.showNavMenu = data
    },
    //添加一个标签页
    addTabItem(state,item){
      var items = state.tabParams.tabItems
      var activeList = state.tabParams.activeNameList
      activeList.push(item.name)
      state.tabParams.activeName = activeList[activeList.length-1]
      var notActive = true
      items.forEach((value,index)=>{
        if(value["name"] == item.name && value["active"]){
          notActive = false
        }
      })
      if(notActive){
        items.splice(items.length,1,item)
      }
    },
    //移除一个标签页
    removeTabItem(state,name){
      var items = state.tabParams.tabItems
      var activeList = state.tabParams.activeNameList
      var removeIndex = -1
      activeList.forEach((value,index)=>{
        if(value == name){
          removeIndex = index
        }
      })
      activeList.splice(removeIndex,1)
      state.tabParams.activeName = activeList[activeList.length-1]
      var removeItem = -1
      var item = {}
      items.forEach((value,index)=>{
        if(value["name"] == name){
          removeItem = index
          item = value
        }
      })
      if(removeItem>-1){
        item.name="thisIsNoActiveItem"
        item.active = false
        items.splice(removeItem,1,item)
      }
    }
  }
})

export default store
