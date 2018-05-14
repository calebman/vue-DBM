## 系统路由实现的一些笔记

### 1. 路由加载
```javascript
// 直接加载页面
import page from '@/views/page';
// 懒加载页面
() => import('@/views/page');
// 指定打包名称的懒加载，可将多个页面打包成一个js进行加载
() => import(/* webpackChunkName: "group-page" */'@/views/page1');
() => import(/* webpackChunkName: "group-page" */'@/views/page2');
() => import(/* webpackChunkName: "group-page" */'@/views/page3');
```

### 2. 404路由
```javascript
// 加载一个404页面
import page404 from '@/views/page404';
// 将以下路由配置放置在路由表的最末端，当路径无法匹配前面的所有路由时将会跳转至page404组件页面
{ path: '*', component: page404}
```

### 3. 路由拦截
```javascript
// 路由跳转前的拦截器
router.beforeEach((to, from, next) => {
  
});
// 路由跳转后的拦截器
router.afterEach(to => {

});
// 路由跳转时出现错误时的拦截器
router.onError((err) => {

});
```

### 4. 动态路由

> 动态路由一般配合页面级的权限控制使用

```javascript
// 通过router.addRoutes方法动态添加可访问路由
router.addRoutes(addRouters)
// hack方法 确保addRoutes已完成
next({ ...to, replace: true }) // set the replace: true so the navigation will not leave a history record 
```
### 5. 路由加载时动画

> 路由加载时的loading动画一般配合路由懒加载使用

```javascript
// 在状态管理中定义一个路由loading标志
const app = {
  state: {
    routerLoading: false, //路由的loading过渡
  },
  mutations: {
    //修改路由loading状态
    UPDATE_ROUTER_LOADING(state, status) {
      state.routerLoading = status
    }
  }
}

// 在路由拦截器中修改loading状态
router.beforeEach((to, from, next) => {
  store.commit('UPDATE_ROUTER_LOADING', true); // 展示路由加载时动画
});
router.afterEach(to => {
  store.commit('UPDATE_ROUTER_LOADING', false);
});
router.onError(err => {
  console.error(err); // for bug
  store.commit('UPDATE_ROUTER_LOADING', false);
});

// 在router-view定义loading动画
// element-ui提供了v-loading指令可以直接使用
<router-view v-loading="$store.getters.routerLoading"></router-view>
```

