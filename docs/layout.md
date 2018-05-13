## 系统整体布局的方式与实现

### 1. 系统整体布局方式

#### 1.1 布局规划

<p align="center">
  <img src="https://github.com/calebman/vue-DBM/blob/master/images/layout.png">
</p>

<p align="center">
  <img src="https://github.com/calebman/vue-DBM/blob/master/images/layout-mark.png">
</p>

* 在这里将区域划分成了蓝色方框和红色方框两部分
* 蓝色方框是一个上下高度固定中间自适应的上中下布局
* 红色方框则是一个左边宽度固定之后使用一个小的布局隔开
* 右边占满剩余宽度的布局。

### 2. 实现方法

#### 2.1 构建上中下布局

> 复制以下代码至浏览器执行
```javascript
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>简单实现上中下布局</title>
  <style>
    html,
    body {
      *overflow: hidden;
      /*防止出现横向滚动条*/
      margin: 0 auto;
    }

    .layout-header,
    .layout-main,
    .layout-footer {
      width: 100%;
      position: absolute;
    }

    .layout-header {
      background: #495060;
      /*设置头部高度*/
      height: 64px;
      top: 0;
    }

    .layout-main {
      background: #e0eeee;
      /*需要与设置的高度一致*/
      top: 64px;
      bottom: 50px;
      /*中间高度自适应*/
      height: auto;
    }

    .layout-footer {
      background: gray;
      /*设置底部高度*/
      height: 50px;
      bottom: 0;
    }
  </style>
</head>

<body>
  <div class="layout-header"></div>
  <div class="layout-main"></div>
  <div class="layout-footer"></div>
</body>

</html>
```

#### 2.2 构建左中右布局

> 复制以下代码至浏览器执行
```javascript
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>简单实现左中右布局</title>
  <style>
    html,
    body {
      margin: 0 auto;
      width: 100%;
      height: 100%;
    }

    .container {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      /*设为伸缩容器*/
    }

    .container .container-left {
      width: 240px;
      /*左侧菜单栏的宽度*/
      height: 100%;
      background: #8db6cd;
    }

    .container .container-center {
      width: 16px;
      /*设置中间隔开层的宽度*/
      height: 100%;
    }

    .container .container-right {
      flex: 1;
      /*占满剩余宽度*/
      width: 100%;
      height: 100%;
      position: relative;
      background: #48d1cc;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="container-left"></div>
    <div class="container-center"></div>
    <div class="container-right"></div>
  </div>
</body>

</html>
```
#### 2.3 合并两个布局

<p align="center">
  <img src="https://github.com/calebman/vue-DBM/blob/master/images/layout.gif">
</p>