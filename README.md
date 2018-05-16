<p align="center">
  <img width="320" src="https://github.com/calebman/vue-DBM/blob/master/images/dbm.svg">
</p>

<strong  align="center"> 

此分支为Database Manager去除额外功能后只保留简版框架项目

 </strong > 


## 说明

该简版框架是使用vue-cli脚手架构建的一个SPA应用，主要依赖于 <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.5.2-brightgreen.svg" alt="vue">
  </a> 与<a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.3.6-brightgreen.svg" alt="element-ui">
  </a>，为了让前后端分离更加彻底，前端在开发时将根据与后端商定的接口协议使用Mockjs模拟响应，在后端完成接口编写后使用不同的启动命令转接后端接口完成整个系统的测试。

## 开发前准备

您的本地环境需要包含有 [nodejs](http://nodejs.org/)，如果您使用git clone还需要有[git](https://git-scm.com/)。本项目主要使用了[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/)、[element-ui](https://github.com/ElemeFE/element)、[axios](https://github.com/axios/axios)、[Mock.js](https://github.com/nuysoft/Mock)等技术栈，熟悉这些技术能够更好的掌握本项目。

**项目在开发时针对性的做了一些笔记，建议先看看这些笔记再了解本项目源码**

 - [项目结构概述](https://github.com/calebman/vue-DBM/blob/master/docs/structure.md)
 - [系统主要布局](https://github.com/calebman/vue-DBM/blob/master/docs/layout.md)
 - [路由](https://github.com/calebman/vue-DBM/blob/master/docs/router.md)
 - [状态管理](https://github.com/calebman/vue-DBM/blob/master/docs/vuex.md)
 - [权限管理](https://github.com/calebman/vue-DBM/blob/master/docs/permission.md)
 - [控件封装与使用](https://github.com/calebman/vue-DBM/blob/master/docs/render.md)
 - [混入](https://github.com/calebman/vue-DBM/blob/master/docs/mixins.md)
 - [数据模拟](https://github.com/calebman/vue-DBM/blob/master/docs/mock.md)

## 框架功能

- [x] 登录页
- [x] 主页
- [x] 页面、元素级权限管理
- [x] Http响应模拟
- [x] 动态路由
- [x] 多模块的状态管理
- [x] 404、401错误页面

## 开发与发布

```bash
# 克隆项目
git clone https://github.com/calebman/vue-DBM.git

# 安装依赖
npm install
   
# 如果下载依赖报错可通过以下方式尝试解决
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev

# 浏览器访问
http://localhost:8060

# 打包发布
npm run build
```

## License

[MIT](https://github.com/calebman/vue-DBM/blob/master/LICENSE)

Copyright (c) 2018-calebman