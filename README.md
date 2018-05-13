<p align="center">
  <img width="320" src="https://github.com/calebman/vue-DBM/blob/master/images/dbm.svg">
</p>

<p align="center">
  <a href="https://travis-ci.org/calebman/vue-DBM" rel="nofollow">
    <img src="https://travis-ci.org/calebman/vue-DBM.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://github.com/calebman/vue-DBM/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="https://github.com/calebman/vue-DBM/releases">
    <img src="https://img.shields.io/github/release/calebman/vue-DBM.svg" alt="GitHub release">
  </a>
</p>

**主意！此项目已重构，当前版本为2.0，老版本请查看 [release](https://github.com/calebman/vue-DBM/releases)下载1.0版本**

#目录

- [项目说明](#说明)
- [开发前准备](#开发前准备)
- [目标功能](#目标功能)
- [项目结构概述](#项目结构概述)
- [部分控件的封装与使用](#部分控件的封装与使用)
- [开发与发布](#开发与发布)
- [更新日志](#更新日志)
- [在线Demo](#在线Demo)
- [致谢](#致谢)
- [许可证](#License)

## 说明

**DMB**是针对经常使用excel的个人或者团体（比如公司每月提交excel报表）而开发的excel数据管理系统，他能够帮助您完成表格的整合、编辑、数据筛选以及导出等等功能，一键导入、按需筛选、指定导出，**DMB**能让你不再被一堆excel文件折磨。

**DBM**前端是使用vue-cli脚手架构建的一个SPA应用，主要依赖于 <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.5.2-brightgreen.svg" alt="vue">
  </a> 与<a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.3.6-brightgreen.svg" alt="element-ui">
  </a>，为了让前后端分离更加彻底，前端在开发时将根据与后端商定的接口协议使用Mockjs模拟响应，在后端完成接口编写后使用不同的启动命令转接后端接口完成整个系统的测试。

如果您也想使用vue.js结合nodejs开发一个带前后端的完整应用的话，参考**DBM前端工程**的实现也许能够帮您解决如下问题

- **如何提高组件的复用性？**
- **如何使用状态管理中的多模块？**
- **如何实现页面级、元素级的权限处理？**
- **如何拦截HTTP请求并使用Mockjs模拟响应驱动UI？**
- **如何使用render函数结合element-ui等框架定制业务组件？**
- **如何提升打包效率以及减小打包体积等**

由于此项目使用业余时间来做，开发周期较长，代码的整洁程度仍待提高，我将不断修改做到自己满意为止，如果您发现问题请直接在Issues中提出，或者您对模块的实现有更好的解决方案欢迎**PR**

## 开发前准备

您的本地环境需要包含有 [nodejs](http://nodejs.org/)，如果您使用git clone还需要有[git](https://git-scm.com/)。本项目主要使用了[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/)、[element-ui](https://github.com/ElemeFE/element)、[axios](https://github.com/axios/axios)、[Mock.js](https://github.com/nuysoft/Mock)等技术栈，熟悉这些技术能够更好的掌握本项目。

本项目在开发时针对性的做了一些笔记，建议可以先看看这些笔记再了解本项目源码

 - [系统布局](https://github.com/calebman/vue-DBM/blob/master/docs/layout.md)
 - [路由](https://github.com/calebman/vue-DBM/blob/master/docs/router.md)
 - [状态管理](https://github.com/calebman/vue-DBM/blob/master/docs/vuex.md)
 - [权限管理](https://github.com/calebman/vue-DBM/blob/master/docs/permission.md)
 - [render函数](https://github.com/calebman/vue-DBM/blob/master/docs/render.md)

## 目标功能

***TODO***

##项目结构概述

***TODO***

##部分控件的封装与使用

***TODO***

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
## 更新日志
 [点我查看 更新日志](https://github.com/calebman/vue-DBM/releases).

## Demo
[点我查看 Demo](https://calebman.github.io/vue-DBM )

##致谢

本项目的架构参考了[**vue-element-admin**](https://github.com/PanJiaChen/vue-element-admin)的实现，表格组件基于[**vue-easytable**](https://github.com/huangshuwei/vue-easytable)进行了定制化的修改，在此非常感谢[PanJiaChen](https://github.com/PanJiaChen/vue-element-admin)与[huangshuwei](https://github.com/PanJiaChen/vue-element-admin)两位项目作者。

## License

[MIT](https://github.com/calebman/vue-DBM/blob/master/LICENSE)

Copyright (c) 2018-calebman