// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import { Input, Tree } from 'element-ui'
import Vuex from 'vuex'
import store from './vuex/store'
import iView from 'iview'
import util from './common/js/util'
import log from './common/js/log'
import 'iview/dist/styles/iview.css'
import 'element-ui/lib/theme-default/index.css'

//单独引用element-ui相关组件
Vue.use(Input)
Vue.use(Tree)
//引用iview的ui组件
Vue.use(iView)
//引用vue-resource
Vue.use(VueResource)
//引用vuex状态机管理
Vue.use(Vuex)
//对vue-resource做相关配置
// Vue.http.options.root = process.env.NODE_ENV === 'development' ? 'static' : ''
Vue.http.options.emulateJSON = true
//项目上线后不再提示警告
Vue.config.productionTip = false
//引入log工具
Vue.prototype.$logHelper = log
//引入工具，配置代理
Vue.prototype.$utilHelper = util
Vue.prototype.HOST = 'static'
//Vue.prototype.HOST = process.env.NODE_ENV === 'development'? '/api':''

let vm = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  render: h => h(App),
  methods:{
    //全局提示错误信息
    showErrorMessage(message){
      this.$Message.error(message)
    }
  },
  created(){
    //全局配置log是否打印,默认为false
    this.$logHelper.openLog = true
    //全局配置Message 参数分别为距离上部高度、延时关闭秒数
    this.$Message.config({top: 50, duration: 2})
    //全局配置Notice 参数分别为距离上部高度、延时关闭秒数
    this.$Notice.config({top: 100, duration: 2})
    //全局配置Loading 参数分别为进度条颜色、失败颜色、高度
    this.$Loading.config({color: '#5cb85c', failedColor: '#f0ad4e', height: 3})
  }
})

//全局配置路由的拦截
router.beforeEach((to, from, next) => {
  //路由权限管理
  let haveRoute = false //访问路径在路由中是否有配置
  vm.$router.options.routes.forEach((value,index)=>{
    if(to.path == value.path){
      haveRoute = true //验证有此配置
    }
  })
  if(haveRoute){
    //判断此路由是否需要进行登录验证
    if(to.meta.requiresAuth){
      //验证其登录状态
      if(window.sessionStorage.getItem("token",true)){
        next()
      }else{
        vm.showErrorMessage('请先登录!')
        next({path: '/'})
      }
    }else {
      //不需要验证的路由直接跳转
      next()
    }
  }else {
    //不存在的路由不予跳转
    vm.showErrorMessage('地址不存在!')
    next(false)
  }
})

//全局配置vue-resource的请求拦截与响应处理
Vue.http.interceptors.push(function(request, next) {
  //开启全局Loading
  this.$Loading.start()

  //如果是使用静态数据模式
  if(Vue.prototype.HOST.indexOf("static")>-1){
    //在使用静态数据测试阶段需要开启以下两个配置
    request.method = "GET"
    request.url+=".json"
  }

  //打印请求体的内容
  var requestParams = request.body
  //对请求体做处理,封装为json
  request.body = {
    data:JSON.stringify(requestParams)
  }
  this.$logHelper.info("[requset data]---"+request.body.data)
  //对请求结果做处理
  next(function(response) {
    this.$logHelper.info("[response data]---"+JSON.stringify(response.body))
    //请求响应成功的全局处理
    if(response.status == 200){
      //判断业务结果吗是否正确
      var code = response.body.code
      if(code != 200){
        //根据业务错误码做统一错误处理
        vm.showErrorMessage(response.body.message)
        //修改响应状态使得内部不再对响应做其他处理
        response.status = -1
        //开启错误Loading
        this.$Loading.error()
        switch (code){
          case 300:
            this.$router.push('/')
            break
        }
      }else{
        //结束全局Loading
        this.$Loading.finish()
      }
    }else{
      //请求响应失败的全局处理
      vm.showErrorMessage('请求错误或此功能需要搭建后台运行')
      this.$Loading.error()
    }
  })

})
