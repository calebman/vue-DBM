# 目录
- [项目说明](#说明)
- [目标功能](#目标功能)
- [项目文件结构](#文件结构)
- [部分控件的封装与使用](#部分控件的封装与使用)
- [项目运行](#项目运行)
- [截图](#部分截图)

## 说明
刚开始学习nodejs时不免枯燥，总想着如何造一个好看的前端页面，尝试着在网上搜索相关的项目找找灵感，发现对于前端使用vue.js搭配后台nodejs的教程不多（也可能是我没找着:camel:），不管怎样，在这个大前提下**DMB**的开发工作开始了。

**DMB**是针对经常使用excel的个人或者团体（比如公司每月提交excel报表）而开发的excel数据管理系统，他能够帮助您完成表格的整合、编辑、数据筛选以及导出等等功能，一键导入、按需筛选、指定导出，**DMB**能让你不再被一堆excel文件折磨。

**DBM**前端是使用vue-cli脚手架构建的一个大型的SPA应用，vue.js的版本为2.0，为了让前后端分离更加彻底，针对每个Http请求模拟了对应的响应数据，这些json文件既可以作为模拟的数据源让前端演示运行，也可以作为各个请求的接口描述文件，想知道构建表格的时候服务端将回传什么数据给你？查看对应的json文件即可。

如果您也想使用vue.js结合nodejs开发一个带前后端的完整应用的话，参考**DBM前端工程**的实现也许能够帮您解决如下问题

> **如何使用render函数渲染自定义组件？**

> **在iview的基础上如何动态的添加标签页？**

> **如何拦截路由实现未登录的页面不允许访问？**

> **如何使用静态文件mock数据驱动UI？**

> **如何使用代理链接后端的web服务？**

> **如何将vue工程打包整合到后端运行等等**

由于此项目使用业余时间来做且属于边学边做，开发周期较长，代码的整洁程度仍待提高，我将不断修改做到自己满意为止，如果您发现问题请直接在Issues中提出，或者您对模块的实现有更好的解决方案欢迎**Pull Requset**

如果对您有帮助，您可以点击右上角 "**Star**" 支持一哈！谢谢！


## 目标功能
- [x] 标签页、菜单栏
- [x] 登录页面
- [x] 用户设置菜单
- [ ] 主页设计
- [x] 角色列表
- [x] 角色创建对话框
- [x] 角色权限修改对话框
- [x] 用户列表
- [ ] 新建、编辑用户对话框
- [x] 表格瀑布
- [x] 新建表格步骤条
- [ ] 操作日志列表
- [x] 数据表格树
- [x] 包含（文本、数字、时间、选项、图片）五种列类型的数据表格
- [x] 数据筛选项的自定义对话框
- [x] 数据表的添加、编辑对话框
- [x] 数据表分页

## 文件结构

```
.
│  README.md(项目自述)
│
├─build
│      build.js(工程构建)
│      check-versions.js(npm版本检查)
│      dev-client.js	(浏览器刷新)
│      dev-server.js	(静态文件、代理、热更新)
│      utils.js(utils)
│      vue-loader.conf.js(webpack生产环境配置)
│      webpack.base.conf.js(webpack基础配置)
│      webpack.dev.conf.js(webpack开发环境配置)
│      webpack.prod.conf.js(webpack生产环境配置)
│
├─config
│      dev.env.js(开发环境配置)
│      index.js	(程序入口)
│      prod.env.js(生产环境配置)
│
├─src
│  │  App.vue
│  │  main.js
│  │
│  ├─assets
│  │      login-bg.png(登录背景)
│  │      logo.png(项目logo)
│  │
│  ├─common
│  │  └─js
│  │          log.js(日志类)
│  │          util.js(工具类)
│  │
│  ├─components
│  │  ├─table
│  │  │  │  MTable.vue(表格组件)
│  │  │  │
│  │  │  └─components
│  │  │      │  ColumnHeader.vue(表头渲染)
│  │  │      │  ImgColumn.vue(图片类型的数据渲染列)
│  │  │      │  SelectColumn.vue(选择类型的数据渲染列)
│  │  │      │  TextColumn.vue(文本、数字、时间类型的数据渲染列)
│  │  │      │
│  │  │      ├─EditDialog
│  │  │      │  │  EditDialog.vue(编辑数据对话框)
│  │  │      │  │
│  │  │      │  └─components
│  │  │      │          MDatePicker.vue(时间选择组件)
│  │  │      │          MNumberInput.vue(数字选择组件)
│  │  │      │          MSelect.vue(选择组件)
│  │  │      │          MText.vue(文本输入组件)
│  │  │      │
│  │  │      ├─FilterDetail
│  │  │      │      FilterDetail.vue(筛选详情对话框)
│  │  │      │
│  │  │      └─FilterDialog
│  │  │              FilterDialog.vue(数据筛选对话框)
│  │  │
│  │  └─tree
│  │      │  MTree.vue(表格树)
│  │      │
│  │      └─components
│  │              TreeItem.vue(自定义树节点)
│  │
│  ├─pages
│  │  │  Container.vue(内容)
│  │  │  ErrorPage.vue(错误页面)
│  │  │  HomePage.vue(主标签页)
│  │  │  Login.vue(登录)
│  │  │  Main.vue(主页面)
│  │  │
│  │  ├─framework
│  │  │      NavMenu.vue(左侧菜单栏)
│  │  │      RoutePage.vue(动态路由页面)
│  │  │
│  │  └─system
│  │      ├─data
│  │      │  │  TablePage.vue(表格管理页面)
│  │      │  │
│  │      │  └─components
│  │      │          CreateSteps.vue(建表流程对话框)
│  │      │          TableCard.vue(表格卡片)
│  │      │
│  │      ├─role
│  │      │  │  RolePage.vue(角色管理页面)
│  │      │  │
│  │      │  └─components
│  │      │          AddRoleDialog.vue(添加角色对话框)
│  │      │          DelRoleDialog.vue(删除角色权限对话框)
│  │      │          EditRoleDialog.vue(修改角色权限对话框)
│  │      │          RoleTags.vue(角色权限项)
│  │      │
│  │      └─user
│  │          │  UserPage.vue(用户管理页面)
│  │          │
│  │          └─components
│  │                  SwitchEnabled.vue(用户状态切换)
│  │                  UserTag.vue(用户角色标识)
│  │
│  ├─router
│  │      index.js(路由配置)
│  │
│  └─vuex
│          store.js(状态机配置)
│
└─static(静态数据模拟)
```

## 部分控件的封装与使用

### 自定义树控件
#### 概要
* 基于element-ui树形控件的二次封装
* 提供编辑、删除节点的接口
* 提供一个next钩子，在业务处理失败时可使用next(false)回滚操作
* 控件演示请查看[demo](https://calebman.github.io/vue-DBM/index.html)

#### 文档
* props

属性 | 说明 | 类型
------------ | ------------- | -------------
value | 源数据，可使用v-model双向绑定 | Array

* events

事件名 | 说明 | 参数
------------ | ------------- | -------------
SaveEdit | 点击编辑或者添加树节点后的保存事件 | (父节点数据、当前节点数据、next)
DelNode | 删除节点事件 | (父节点数据、当前节点数据、next)
NodeClick | 节点点击事件 | (当前节点数据)

* 源数据描述

属性 | 说明 
------------ | -------------
value | 树节点的唯一标识
label | 树节点的显示名称
status | 1：编辑状态\0：显示状态\-1：不可编辑状态
children | 子节点数据

* 调用示例

```
 <m-tree
    v-model="tableTree"
    @SaveEdit="SaveEdit"
    @DelNode="DelNode"
    @NodeClick="handleNodeClick"></m-tree>

SaveEdit(parentNode,data,next){
    var param = {
      parentNode:parentNode,
      node:data
    }
    this.$http.post(URL,param).then((response) => {
      if(response.status == 200){
        next(true,response.body.data.nodeId)
      }else{
        next(false)
      }
    })
}
```


## 项目运行

### 克隆到本地
```
git clone https://github.com/calebman/vue-DBM.git
```

### 安装依赖包
```
npm install
```

### 开启本地服务器localhost:8000
```
npm run dev
```

### 打包页面
```
npm run build
```

### 登录系统
由于演示版本使用模拟数据，登录账号与密码可随意输入

ps:由于前端工程使用了大量的json文件来做数据模拟，因此可以在不搭建nodejs+mysql后台的情况下运行

### 效果演示

[demo地址](https://calebman.github.io/vue-DBM/index.html)

### 对应的后端工程

[地址在这里](https://github.com/calebman/nodejs-DBM)

## 部分截图

#### 登录

![](https://calebman.github.io/vue-DBM/login.png)

#### 权限管理

![](https://calebman.github.io/vue-DBM/permission.png)

#### 表格列表

![](https://calebman.github.io/vue-DBM/table.png)

#### 创建表格

![](https://calebman.github.io/vue-DBM/createTable.png)

#### 表格操作

![](https://calebman.github.io/vue-DBM/tableData.png)


