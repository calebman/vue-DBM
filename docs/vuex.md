## 系统状态管理实现的一些笔记

### 1. 小知识

* state中的数据修改需要通过mutation或action触发
* mutation中的方法必须是同步函数
* action可包含任意异步操作，可返回一个Promise
* mutation以及action可以重复，调用时将会依次调用，getter必须唯一


### 2. 多模块的实现以及注意事项
* 除state会根据组合时模块的别名来添加层级，其他的都是合并在根级下，所以在回调函数获取的getters、commit、dispatch都是全局作用的
* mutation的回调参数只有state，state为当前模块的状态树，下同
* action的回调参数为state、rootState、getters、commit、dispatch，如果需要在action中调用其他的action可使用dispatch直接调用
* getter的回调参数为state、rootState、getters
* 模块间可以通过回调的rootState进行交互
* 出现重名的mutation、action将依次触发
```javascript
// 多模块的实现 app以及user为各个子模块
export default new Vuex.Store({
    modules: {
        app,
        user
    },
    getters
})
```

### 3. 状态管理的持久化
```javascript
// 防止刷新页面状态丢失可使用以下方式
// 摘抄于 https://github.com/robinvdvleuten/vuex-persistedstate
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

const store = new Store({
  // ...
  plugins: [
    createPersistedState({
      storage: {
        getItem: key =* Cookies.get(key),
        // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        setItem: (key, value) =* Cookies.set(key, value, { expires: 3, secure: true }),
        removeItem: key =* Cookies.remove(key)
      }
    })
  ]
})
```