
const state = {
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
  },
  event:{
    detail:"",
    percent:0
  },
  fastItem:{
    detail:"",
    url:""
  },
  notification:[]
}

export default state
