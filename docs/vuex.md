## 系统状态管理实现的一些笔记

### 1. 小知识

* state中的数据修改需要通过mutation或action触发
* mutation中的方法必须是同步函数
* action可包含任意异步操作，可返回一个Promise
* mutation以及action可以重复，调用时将会依次调用，getter必须唯一

### 2. 多模块

> 业务比较复杂时可使用状态管理中的多模块，有以下注意事项

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

### 3. 辅助函数

> Vuex除了提供了Store对象以外还对外提供了一些辅助函数

* mapState、mapGetters将store中的state、getters属性映射到vue组件局部的计算属性中

```javascript
import { mapState } from 'vuex'
computed: mapState([ 
    // 映射 this.name 到 this.$store.state.name 
    'name'
])

import { mapGetters } from 'vuex'
computed: {
    // 映射 this.name 到 this.$store.getters.name 
    ...mapGetters([ 'name' ])
}
```



* mapActions、mapMutations将store中的dispatch、commit方法映射到vue组件局部的方法中

```javascript
import { mapActions } from 'vuex'

methods: { 
    // 映射 this.LoginByUsername() 到 this.$store.dispatch('LoginByUsername')
    ...mapActions([ 'LoginByUsername' ]), 
    // 映射 this.login() to this.$store.dispatch('LoginByUsername')
    ...mapActions({ login: 'LoginByUsername'}) 
}

import { mapMutations } from 'vuex'

methods: { 
    // 映射 this.SET_NAME() 到 this.$store.commit('SET_NAME') ])
    ...mapMutations([ 'SET_NAME' ]) , 
    // 映射 this.setName() 到 this.$store.commit('SET_NAME') })
    ...mapMutations({ setName: 'SET_NAME' ])
}
```



### 4. 数据持久化插件

> 刷新页面时希望状态不被丢失时可用此插件

```javascript
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
###  5. 日志插件

> 开发环境中希望能够跟踪状态变化并输出时可用此插件

```javascript
// createLogger是vuex中的内置插件
import createLogger from 'vuex/dist/logger'

let vuexPlugins = [];
if(process.env.NODE_ENV !== 'production'){ // 开发环境加载该插件
    vuexPlugins.push(createLogger); 
}

const store = new Store({
  // ...
  plugins: vuexPlugins
})

```

