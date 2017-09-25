
const mutations = {
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
    console.log("[store]"+JSON.stringify(items))
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
  },
  //添加执行事件描述
  addEvent(state,event){
    state.event=event
  },
  //添加一个通知
  addNotification(state,notification){

  },
  //移除一个通知
  removeNotification(state,notificationId){

  },
  //添加一个快捷选项
  addFastItem(state,fastItem){
    state.fastItem = fastItem
  }
}
export default mutations
