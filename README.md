# 中文|[ENGLISH](https://github.com/calebman/vue-DBM/blob/master/README_EN.md) #
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
├index.html(页面入口)
├package.json(架包管理)
├README.md(项目自述)
├README_EN.md(Project Readme)
├<build>
│  ├build.js(工程构建)
│  ├check-versions.js(npm版本检查)
│  ├dev-client.js(浏览器刷新)
│  ├dev-server.js(静态文件、代理、热更新)
│  ├utils.js(utils)
│  ├vue-loader.conf.js(vue加载器)
│  ├webpack.base.conf.js(webpack基础配置)
│  ├webpack.dev.conf.js(webpack开发环境配置)
│  └webpack.prod.conf.js(webpack生产环境配置)
├<config>
│  ├dev.env.js(开发环境配置)
│  ├index.js(程序入口)
│  └prod.env.js(生产环境配置)
├<src>
│  ├App.vue
│  ├main.js
│  ├<assets>
│  │  ├login-bg.png(登录背景)
│  │  └logo.png(项目logo)
│  ├<common>
│  ├<components>
│  │  ├Login.vue(登录)
│  │  ├Main.vue(主界面)
│  │  ├<data>
│  │  │  ├CreateSteps.vue(建表步骤组件)
│  │  │  ├Index.vue(表格管理)
│  │  │  └TableCard.vue(表格卡片组件)
│  │  ├<framework>
│  │  │  ├Container.vue(内容)
│  │  │  ├ErrorPage.vue(错误页)
│  │  │  ├HomePage.vue(默认显示的标签页)
│  │  │  ├NavMenu.vue(左侧菜单栏)
│  │  │  └RoutePage.vue(路由页)
│  │  ├<public>
│  │  │  ├<charts>
│  │  │  │  └Index.vue(图表组件)
│  │  │  ├<progress>
│  │  │  │  └Index.vue(进度条组件)
│  │  │  ├<table>
│  │  │  │  ├ColumnHeader.vue(自定义表格列头)
│  │  │  │  ├ImgColumn.vue(图片类型的数据渲染)
│  │  │  │  ├Index.vue(表格组件)
│  │  │  │  ├SelectColumn.vue(选择类型的数据渲染)
│  │  │  │  ├TextColumn.vue(文本、数字、日期类型的数据渲染)
│  │  │  │  ├<edit>
│  │  │  │  │  ├Index.vue(行编辑对话框)
│  │  │  │  │  ├MDatePicker.vue(日期选择器)
│  │  │  │  │  ├MNumberInput.vue(数字选择器)
│  │  │  │  │  ├MSelect.vue(选项)
│  │  │  │  │  └MText.vue(文本输入框)
│  │  │  │  ├<filter>
│  │  │  │  │  └Index.vue(筛选对话框)
│  │  │  │  ├<filterdetail>
│  │  │  │  │  └Index.vue(筛选详情)
│  │  │  ├<tree>
│  │  │  │  ├Index.vue(自定义树)
│  │  │  │  └TreeItem.vue(自定树节点)
│  │  ├<role>
│  │  │  ├AddRoleDialog.vue(添加角色对话框)
│  │  │  ├DelRoleDialog.vue(删除角色对话框)
│  │  │  ├EditRoleDialog.vue(角色授权对话框)
│  │  │  ├Index.vue(角色管理页)
│  │  │  └RoleTags.vue(角色项)
│  │  ├<user>
│  │  │  ├Index.vue(用户管理页)
│  │  │  ├SwitchEnabled.vue(启动/禁用切换)
│  │  │  └UserTag.vue(用户所属角色项)
│  ├<router>
│  │  └index.js(路由配置)
│  ├<util>
│  │  ├logger.js(日志)
│  │  └util.js(工具)
│  ├<vuex>
│  │  ├actions.js
│  │  ├getters.js
│  │  ├index.js(vuex配置)
│  │  ├mutations.js(函数)
│  │  └state.js(状态)
├<static>(已下为接口的数据模拟文件)
│  ├create.json(系统创建所需数据)
│  ├getCharsData.json(图表所需数据)
│  ├login.json(登录接口)
│  ├logout.json(注销接口)
│  ├<admin>
│  │  ├<data>
│  │  │  ├<table>
│  │  │  │  ├<DOTA2>
│  │  │  │  │  ├add.json(表格增加一行接口)
│  │  │  │  │  ├create.json(表格创建时所需数据)
│  │  │  │  │  ├del.json(表格删除行接口)
│  │  │  │  │  ├edit.json(表格编辑接口)
│  │  │  │  │  ├<create>
│  │  │  │  │  │  └filter.json(表格筛选接口)
│  │  ├<system>
│  │  │  ├<role>
│  │  │  │  ├add.json(增加角色接口)
│  │  │  │  ├create.json(角色管理页创建时所需数据)
│  │  │  │  ├del.json(删除角色接口)
│  │  │  │  └edit.json(修改授权接口)
│  │  │  ├<table>
│  │  │  │  ├create.json(表格列表创建时所需接口)
│  │  │  │  ├del.json(删除表格接口)
│  │  │  │  └edit.json(编辑表格接口)
│  │  │  ├<tree>
│  │  │  │  ├del.json(删除树节点接口)
│  │  │  │  └edit.json(编辑树节点接口)
│  │  │  ├<user>
│  │  │  │  ├add.json(添加用户接口)
│  │  │  │  ├create.json(用户管理页面创建时所需数据)
│  │  │  │  ├del.json(删除用户接口)
│  │  │  │  ├disabled.json(禁用用户接口)
│  │  │  │  ├edit.json(编辑用户接口)
│  │  │  │  └enabled.json(启用用户接口)
```

## 部分控件的封装与使用

### 自定义树控件
#### 概要
* 基于element-ui树形控件的二次封装
* 提供编辑、删除节点的接口
* 提供一个next钩子，在业务处理失败时可使用next(false)回滚操作
* 控件源码见src/components/tree

#### 演示
![](http://owkmkzzaa.bkt.clouddn.com/image/jpgtree.gif)

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
status | (1：编辑状态)(0：显示状态)(-1：不可编辑状态)
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

### 自定义图表
#### 概要
* 基于echarts的二次封装
* 由数据驱动
* 控件源码见src/components/charts

#### 演示
![](http://owkmkzzaa.bkt.clouddn.com/charts.gif)

#### 文档
* props

属性 | 说明 | 类型
------------ | ------------- | -------------
_id | 图表唯一标识，当id重复将会报错 | String
_titleText | 图表标题 | String
_xText | x轴描述 | String
_yText | y轴描述 | String
_chartData | 图表数据 | Array
_type | 图表类型，提供三种(LineAndBar/LineOrBar/Pie) | String

* 调用示例

```
 <chart
  :_id="'testCharts'"
  :_titleText="'访问量统计'"
  :_xText="'类别'"
  :_yText="'总访问量'"
  :_chartData="chartData"
  :_type="'Pie'"></chart>
 //测试数据样例 [["类别1",10],["类别2",20]]
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

[overseas](https://calebman.github.io/vue-DBM/index.html)

[国内](http://owkyrdh4c.bkt.clouddn.com)

### 对应的后端工程

[地址在这里](https://github.com/calebman/nodejs-DBM)

## 部分截图

#### 登录

![](http://owkmkzzaa.bkt.clouddn.com/login.png)

#### 权限管理

![](https://calebman.github.io/vue-DBM/permission.png)

#### 表格列表

![](http://owkmkzzaa.bkt.clouddn.com/table.png)

#### 创建表格

![](http://owkmkzzaa.bkt.clouddn.com/createTable.png)

#### 表格操作

![](http://owkmkzzaa.bkt.clouddn.com/tableData.png)


