## 基于vue-cli脚手架的打包优化与用户体验

### 1. 做哪部分的优化

* cdn优化
* 路由懒加载
* 其他优化
* 用户体验

### 2. cdn优化

> 类似于vue、vue-router、moment、element-ui等提供了cdn的架或者工具类可在index.html中直接引入，然后配置webpack的externals使其不加入打包配置，从而减小app.js、vendor.js的体积

* 在index.html使用cdn引入依赖库

```html
<!-- 网络请求工具类 -->
<script src="https://cdn.bootcss.com/axios/0.18.0/axios.min.js"></script>
<!-- vue -->
<script src="https://cdn.bootcss.com/vue/2.5.16/vue.min.js"></script>
<!-- vue-router -->
<script src="https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js"></script>
<!-- vuex -->
<script src="https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js"></script>
<!-- momentjs的中文包 -->
<script src="https://cdn.bootcss.com/moment.js/2.22.1/moment-with-locales.min.js"></script>
<!-- momentjs -->
<script src="https://cdn.bootcss.com/moment.js/2.22.1/locale/zh-cn.js"></script>
<!-- element-ui样式 -->
<script src="https://cdn.bootcss.com/element-ui/2.3.6/theme-default/index.css"></script>
<!-- element-ui -->
<script src="https://cdn.bootcss.com/element-ui/2.3.6/index.js"></script>
```

* 配置build文件夹下webpack.base.conf.js文件

```javascript
module.exports = {
  // ...
  externals: {
    'axios': 'axios',
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'moment': 'moment',
    'element-ui': 'ELEMENT'
  }
}
```

### 3. 路由懒加载

> 路由懒加载能够将代码根据路由配置进行分割，加快首屏渲染的速度，在大型的单页应用中是必不可少的
>
> 参见[路由管理](https://github.com/calebman/vue-DBM/blob/master/docs/router.md)的实现

### 5. 其他优化

* 尽量少的注册全局组件，使用UI框架可以参考文档做按需加载
* 可以和服务端配合采用gzip压缩，减少传输耗时
* 在更新不是很频繁的应用可考虑提高缓存时间
* 例如moment、lodash这种庞大的工具库在使用的功能不多的情况下可考虑寻找替代品

### 6. 用户体验

> 一个单页应用到了一定规模不管怎么优化首屏渲染还是一个比较慢的过程，此时可以考虑在首屏渲染时使用一个加载动画告诉用户系统正在初始化

* 首先在index.html中定义一个渲染动画

```html
<body>
  <div id="app"></div>
  <!-- 首屏渲染时的加载动画 -->
  <div id="system-loading" class="showbox">
    <div class="loader">
      <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
      </svg>
    </div>
    <div class="text">
      <span>系统初始化中...</span>
    </div>
  </div>
  <!-- built files will be auto injected -->
</body>
```

* 然后再App.vue组件的mounted钩子中移除这个loading

```javascript
export default {
  // ...
  mounted() {
    document.body.removeChild(document.getElementById("system-loading"));
  }
};
```

