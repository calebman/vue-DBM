## 系统权限管理的实现

### 1. 需要实现的功能

* 根据用户登录后的权限表生成路由
* 页面级的权限控制
* dom元素级的权限控制
* 登录状态失效的处理

### 2. 路由设计

> 首先我们需要设计路由对象需要有哪些必要参数信息
>
> 为了实现权限管理我们必须要有roles参数代表该路由必须拥有哪些权限才能访问
>
> 为了更好的展示路由在这里设计了title、icon两个参数用于侧边栏的菜单展示
>
> 而有些路由不需要在侧边栏展示，这里使用hidden参数来告诉程序哪些路由是不需要展示的

```javascript
// 首先设计路由对象参数
/**
* hidden: true                   如果hidden为true则在左侧菜单栏展示，默认为false
* name:'router-name'             路由名称，路由唯一标识
* meta : {
    roles: ['admin','editor']    权限列表，用于页面级的权限控制，默认不设置代表任何权限均可访问
    title: 'title'               对应路由在左侧菜单栏的标题名称
    icon: 'icon-class'           对应路由在左侧菜单栏的图标样式
 }
**/
```
> 接下来我们需要实现路由的动态加载
>
> 系统初始化时加载必要路由，之后根据登录用户的权限加载符合条件的路由

```javascript
// 定义系统初始化时加载的必要路由信息
export const constantRouterMap = [
  { path: '/login', name: 'login', meta: { title: "系统登录", hidden: true }, component: login },
  { path: "/404", name: "page404", meta: { title: "页面走丢了", hidden: true }, component: page404 },
  { path: "/401", name: "page401", meta: { title: "权限不足", hidden: true }, component: page401 }
]
// 定义布局页面
const layout = () => import(/* webpackChunkName: "group-index" */ '@/views/layout');
// 定义异步加载的路由信息
export const asyncRouterMap = [
  {
    path: '/',
    name: 'main',
    redirect: '/dashboard',
    hidden: true,
    component: layout,
    children: [
      { path: 'dashboard', name: 'dashboard', meta: { title: "仪表盘" }, component: () => import(/* webpackChunkName: "group-index" */'@/views/dashboard') }
    ]
  },
  {
    path: '/permission',
    name: 'permission',
    meta: { title: "权限页", icon: "dbm d-icon-quanxian" },
    redirect: '/permission/adminpermission',
    component: layout,
    children: [
      { path: "adminpermission", name: "adminPermission", meta: { title: "管理员权限页", roles: ["admin"] }, component: () => import('@/views/permission/admin') },
      { path: "watcherpermission", name: "watcherPermission", meta: { title: "游客权限页", roles: ["admin", "watcher"] }, component: () => import('@/views/permission/watcher') },
      { path: "elementpermission", name: "elementPermission", meta: { title: "元素级别权限" }, component: () => import('@/views/permission/element') }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
```

### 3. 页面级的权限控制

> 使用路由拦截来实现页面级的权限控制
>
> 拦截路由跳转判断用户是否登录
>
> 从拉取的用户信息中提取权限表通过addRoutes方法动态加载异步路由表
>
> 每次路由跳转时判断用户是否拥有该路由的访问权限实现动态权限匹配

```javascript
// 定义免登白名单
const whiteList = ['/login', '/404', '/401'];
// 拦截路由跳转
router.beforeEach((to, from, next) => {
  store.commit('UPDATE_ROUTER_LOADING', true); // 展示路由加载时动画
  if (getToken()) {  // 存在token
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完用户信息
        store.dispatch('GetUserInfo').then(data => { // 拉取用户信息
          const roles = data.roles // 权限表必须为数组,例如: ['admin','editer']
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(err => { // 拉取用户信息失败，提示登录状态失效
          store.dispatch('FedLogOut').then(() => {
            Message.error('登录状态失效, 请重新登录');
            next({ path: '/login' });
          })
        })
      } else {
        if (hasPermission(store.getters.roles, to.meta.roles)) { // 动态权限匹配
          next();
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true } });
        }
      }
    }
  } else { // 没有token
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
    }
  }
});
```

### 4. 元素级的权限控制

> 使用自定义指令来实现元素级的权限控制
>
> 在被绑定元素插入父节点时验证用户是否包含该元素的所需权限
>
> 根据鉴权结果来决定是否移除该元素

```javascript
import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding; // 获取自定义指令传入的鉴权信息
    const roles = store.getters && store.getters.roles; // 从状态管理中获取当前用户的路由信息

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;

      const hasPermission = roles.some(role => { // 判断用户是否包含该元素所需权限
        return permissionRoles.includes(role);
      })

      if (!hasPermission) { // 权限不足
        el.parentNode && el.parentNode.removeChild(el); // 移除该dom元素
      }
    } else {
      throw new Error(`必须要有权限写入，例如['admin']`)
    }
  }
}

// 在vue组件上使用它
// 引入并注册permission指令
import permission from "@/directive/permission/index.js";
export default {
  directives: {
    permission
  }
}
// 使用permission指令
<el-button v-permission="['admin']">admin 可见</el-button>
<el-button v-permission="['admin','watcher']">watcher 可见</el-button>
```



